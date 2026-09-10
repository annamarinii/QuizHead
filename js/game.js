/* ==========================================================================
   QuizHead — motore di gioco
   Ciclo: pronti → countdown → round cronometrato → esito turno → classifica.
   L'input arriva da DeviceOrientation; tastiera e bottoni sono il fallback.
   ========================================================================== */

(function () {
  'use strict';

  var RAD = Math.PI / 180;
  var DEG = 180 / Math.PI;

  /* Inclinazione in gradi rispetto alla verticale:
     negativa = schermo verso il basso (avanti), positiva = verso l'alto. */
  var TILT_ANSWER  = 32;    // soglia oltre cui la risposta viene registrata
  var TILT_NEUTRAL = 16;    // rientro richiesto prima della risposta successiva
  var SMOOTHING    = 0.35;  // filtro passa-basso: smorza il tremolio del sensore
  var FEEDBACK_MS  = 850;   // durata del flash verde/rosso
  var SENSOR_GRACE = 1500;  // se entro questo tempo non arriva nulla → manuale

  /* ---------------------------------------------------------------- DOM -- */

  var $ = function (sel) { return document.querySelector(sel); };

  var screenGame = $('#screen-game');
  var stage      = $('#stage');

  var views = {
    ready:  $('#view-ready'),
    count:  $('#view-count'),
    play:   $('#view-play'),
    result: $('#view-result'),
    final:  $('#view-final')
  };

  var readyRound  = $('#ready-round');
  var readyTeam   = $('#ready-team');
  var readyPlayer = $('#ready-player');
  var resultPlayer = $('#result-player');
  var finalEyebrow = $('#final-eyebrow');
  var finalTitle  = $('#final-title');
  var btnAgain    = $('#btn-again');
  var countNum    = $('#count-num');
  var hudTimer    = $('#hud-timer');
  var hudScore    = $('#hud-score');
  var catEl       = $('#play-cat');
  var wordEl      = $('#play-word');
  var verdictEl   = $('#play-verdict');
  var manualBox   = $('#manual');
  var resultTeam  = $('#result-team');
  var resultScore = $('#result-score');
  var resultList  = $('#result-list');
  var leaderboard = $('#leaderboard');

  /* -------------------------------------------------------------- stato -- */

  var config  = null;
  var teams   = [];     // [{ name, players, score, roundScore, words }]
  var turn    = 0;      // indice della squadra dentro il giro
  var round   = 0;      // indice del giro in corso
  var rounds  = 1;      // quanti giri dura la partita
  var over    = false;  // partita conclusa: cambia il tasto della classifica
  var pool    = [];     // tutte le parole delle categorie scelte
  var deck    = [];     // pila da cui si pesca (mescolata, senza ripetizioni)
  var current = null;

  var running  = false;
  var locked   = false; // in attesa che il telefono torni verticale
  var tilt     = null;  // segnale filtrato, da -1 (avanti) a +1 (indietro)
  var rafId    = null;
  var endAt    = 0;
  var shown    = -1;    // ultimo secondo disegnato
  var timers   = [];    // setTimeout attivi, azzerati a ogni cambio di fase
  var sensorSeen = false;
  var wakeLock   = null;
  var actx       = null;

  /* ------------------------------------------------------------ utility -- */

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }

  function buzz(ms) {
    if (navigator.vibrate) { try { navigator.vibrate(ms); } catch (e) {} }
  }

  function after(ms, fn) { timers.push(setTimeout(fn, ms)); }

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* --------------------------------------------------------------- audio -- */

  // Il giocatore non vede lo schermo: il suono è il suo unico feedback diretto.
  function beep(freq, dur, type) {
    try {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      actx = actx || new Ctx();
      if (actx.state === 'suspended') actx.resume();

      var osc = actx.createOscillator();
      var gain = actx.createGain();
      osc.type = type || 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, actx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.22, actx.currentTime + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + dur);
      osc.connect(gain);
      gain.connect(actx.destination);
      osc.start();
      osc.stop(actx.currentTime + dur + 0.03);
    } catch (e) {}
  }

  /* ----------------------------------------------------------- wake lock -- */

  function keepAwake() {
    if (!navigator.wakeLock || wakeLock) return;
    navigator.wakeLock.request('screen')
      .then(function (lock) { wakeLock = lock; })
      .catch(function () {});
  }

  function releaseAwake() {
    if (!wakeLock) return;
    try { wakeLock.release(); } catch (e) {}
    wakeLock = null;
  }

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible' && running) keepAwake();
  });

  /* -------------------------------------------------------------- views -- */

  function showView(name) {
    clearTimers();
    Object.keys(views).forEach(function (k) { views[k].hidden = k !== name; });
  }

  function flash(kind) {
    screenGame.classList.remove('is-hit', 'is-miss');
    if (kind) screenGame.classList.add(kind);
  }

  /* --------------------------------------------------------- rotazione --- */

  /* Con il blocco rotazione attivo il viewport resta verticale anche se il
     telefono è girato: in quel caso ruotiamo noi il contenuto. */
  function updateRotation(upX, upY, vertical) {
    var cls = '';

    if (vertical && window.innerHeight >= window.innerWidth && Math.abs(upX) > Math.abs(upY)) {
      cls = upX > 0 ? 'is-rot-cw' : 'is-rot-ccw';
    }
    if (stage.dataset.rot === cls) return;

    stage.dataset.rot = cls;
    stage.classList.remove('is-rot-cw', 'is-rot-ccw');
    if (cls) stage.classList.add(cls);
  }

  /* ---------------------------------------------------------- orientation -- */

  function onOrientation(e) {
    if (e.beta === null || e.gamma === null) return;
    sensorSeen = true;

    var b = e.beta * RAD;
    var g = e.gamma * RAD;

    /* Verticale "su" della Terra espresso negli assi del telefono.
       La componente Z (cos b · cos g) vale 0 a telefono dritto, -1 con lo
       schermo rivolto a terra, +1 con lo schermo rivolto al cielo: è la
       stessa qualunque sia la rotazione del telefono nel suo piano. */
    var upX = -Math.cos(b) * Math.sin(g);
    var upY = Math.sin(b);
    var upZ = Math.cos(b) * Math.cos(g);

    tilt = tilt === null ? upZ : tilt + (upZ - tilt) * SMOOTHING;

    var deg = Math.asin(clamp(tilt, -1, 1)) * DEG;

    // Fuori dal round: aggiorna la rotazione. Durante il round la congeliamo,
    // altrimenti le inclinazioni delle risposte la farebbero sfarfallare.
    if (!running) {
      updateRotation(upX, upY, Math.abs(deg) < 45);
      return;
    }

    if (locked) {
      if (Math.abs(deg) < TILT_NEUTRAL) locked = false;
      return;
    }
    if (deg <= -TILT_ANSWER) answer(true);
    else if (deg >= TILT_ANSWER) answer(false);
  }

  /* --------------------------------------------------------------- deck -- */

  /* Ogni voce del mazzo si porta dietro la sua categoria: mescolate insieme,
     "Guidare" da sola non dice se va raccontata o mimata. */
  function buildPool() {
    var bank = (window.QuizHead && window.QuizHead.words) || {};
    var meta = {};
    ((window.QuizHead && window.QuizHead.CATEGORIES) || []).forEach(function (c) {
      meta[c.id] = c;
    });

    var seen = {};
    pool = [];

    config.categories.forEach(function (id) {
      var list = bank[id];
      if (!list || !list.length) {
        console.warn('[QuizHead] nessuna parola per la categoria "' + id + '"');
        return;
      }
      var cat = meta[id] || { id: id, label: id, icon: '' };
      list.forEach(function (w) {
        if (!seen[w]) { seen[w] = true; pool.push({ word: w, cat: cat }); }
      });
    });

    deck = shuffle(pool.slice());
  }

  function drawWord() {
    if (!deck.length) deck = shuffle(pool.slice());
    return deck.pop();
  }

  /* -------------------------------------------------------------- round -- */

  function sizeClass(word) {
    var n = word.length;
    if (n <= 11) return 's';
    if (n <= 22) return 'm';
    if (n <= 38) return 'l';
    return 'xl';
  }

  function nextWord() {
    current = drawWord();

    // Per il mimo l'etichetta non è un indizio ma l'istruzione: va urlata.
    var isMime = current.cat.id === 'mimo';
    catEl.textContent = (current.cat.icon ? current.cat.icon + ' ' : '') +
                        (isMime ? 'Mimo — non parlare' : current.cat.label);
    catEl.classList.toggle('is-action', isMime);

    wordEl.textContent = current.word;
    wordEl.dataset.len = sizeClass(current.word);
  }

  function answer(hit) {
    if (!running || !current) return;

    locked = true;
    var team = teams[turn];
    team.words.push({ word: current.word, hit: hit });
    if (hit) { team.score++; team.roundScore++; }

    hudScore.textContent = team.roundScore;
    verdictEl.textContent = hit ? '+1' : 'Passo';
    verdictEl.className = 'play__verdict ' + (hit ? 'is-hit' : 'is-miss');
    flash(hit ? 'is-hit' : 'is-miss');
    buzz(hit ? 35 : [20, 60, 20]);
    beep(hit ? 880 : 220, hit ? 0.16 : 0.22, hit ? 'sine' : 'square');

    current = null;
    after(FEEDBACK_MS, function () {
      if (!running) return;
      flash(null);
      verdictEl.textContent = '';
      nextWord();
    });
  }

  /* Le squadre più piccole riciclano i propri giocatori sui giri in eccesso. */
  function currentPlayer() {
    var team = teams[turn];
    return team.players[round % team.players.length];
  }

  function startTurn() {
    var team = teams[turn];
    readyRound.textContent = 'Giro ' + (round + 1) + ' di ' + rounds;
    readyTeam.textContent = team.name;
    readyPlayer.textContent = currentPlayer();
    flash(null);
    showView('ready');
  }

  function countdown() {
    showView('count');
    var n = 3;
    countNum.textContent = n;
    beep(660, 0.12);

    var step = function () {
      n--;
      if (n > 0) {
        countNum.textContent = n;
        beep(660, 0.12);
        after(700, step);
      } else {
        countNum.textContent = 'VIA!';
        beep(990, 0.25);
        after(500, startRound);
      }
    };
    after(700, step);
  }

  function startRound() {
    var team = teams[turn];
    team.words = [];
    team.roundScore = 0;

    showView('play');
    hudScore.textContent = '0';
    hudTimer.textContent = config.duration;
    hudTimer.classList.remove('is-urgent');
    verdictEl.textContent = '';
    flash(null);

    running = true;
    locked = Math.abs(Math.asin(clamp(tilt || 0, -1, 1)) * DEG) >= TILT_NEUTRAL;
    shown = -1;
    endAt = performance.now() + config.duration * 1000;

    keepAwake();
    nextWord();
    rafId = requestAnimationFrame(tick);

    // Se il sensore non dà segno di vita, tira su i bottoni manuali.
    after(SENSOR_GRACE, function () {
      if (!sensorSeen) manualBox.hidden = false;
    });
  }

  function tick(now) {
    if (!running) return;

    var left = Math.max(0, Math.ceil((endAt - now) / 1000));
    if (left !== shown) {
      shown = left;
      hudTimer.textContent = left;
      if (left <= 5 && left > 0) {
        hudTimer.classList.add('is-urgent');
        beep(1320, 0.06);
      }
    }

    if (left <= 0) { endRound(); return; }
    rafId = requestAnimationFrame(tick);
  }

  function endRound() {
    running = false;
    current = null;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    clearTimers();
    releaseAwake();
    flash(null);
    manualBox.hidden = true;

    buzz([80, 60, 80, 60, 160]);
    beep(392, 0.5, 'triangle');

    var team = teams[turn];
    resultPlayer.textContent = 'Turno di ' + currentPlayer();
    resultTeam.textContent = team.name;
    resultScore.textContent = team.roundScore;
    resultList.innerHTML = team.words.map(function (r) {
      return '<li class="' + (r.hit ? 'is-hit' : 'is-miss') + '">' +
               '<span>' + escapeHtml(r.word) + '</span>' +
               '<i aria-hidden="true">' + (r.hit ? '✓' : '✕') + '</i>' +
             '</li>';
    }).join('') || '<li class="is-empty">Nessuna parola giocata</li>';

    showView('result');
  }

  function nextTurn() {
    turn++;
    if (turn < teams.length) { startTurn(); return; }

    // Giro completato: tutte le squadre hanno giocato.
    turn = 0;
    round++;
    showStandings(round >= rounds);
  }

  function showStandings(isFinal) {
    over = isFinal;

    finalEyebrow.textContent = isFinal
      ? 'Partita finita'
      : 'Fine del giro ' + round + ' di ' + rounds;
    finalTitle.textContent = isFinal ? 'Classifica' : 'Classifica parziale';
    btnAgain.textContent = isFinal ? 'Rigioca' : 'Vai al giro ' + (round + 1);

    var ranking = teams.slice().sort(function (a, b) { return b.score - a.score; });
    var place = 0;
    var prev = null;

    leaderboard.innerHTML = ranking.map(function (t, i) {
      if (t.score !== prev) { place = i + 1; prev = t.score; }
      return '<li class="' + (place === 1 ? 'is-first' : '') + '">' +
               '<span class="lb__pos">' + place + '</span>' +
               '<span class="lb__name">' + escapeHtml(t.name) + '</span>' +
               '<span class="lb__score">' + t.score + '</span>' +
             '</li>';
    }).join('');

    showView('final');   // prima della fanfara: showView azzera i timer in coda

    if (isFinal) {
      beep(523, 0.18);
      after(180, function () { beep(659, 0.18); });
      after(360, function () { beep(784, 0.4); });
    } else {
      beep(587, 0.16);
    }
  }

  /* ------------------------------------------------------------- match --- */

  function startMatch(cfg) {
    config = cfg;

    // I campi lasciati vuoti nel setup ricadono sui nomi di default.
    teams = (config.rosters || []).map(function (r, i) {
      var players = (r.players || []).map(function (p, j) {
        return String(p || '').trim() || ('Giocatore ' + (j + 1));
      });
      if (!players.length) players = ['Giocatore 1'];

      return {
        name: String(r.name || '').trim() || ('Squadra ' + (i + 1)),
        players: players,
        score: 0,
        roundScore: 0,
        words: []
      };
    });

    rounds = teams.reduce(function (max, t) { return Math.max(max, t.players.length); }, 1);
    round = 0;
    turn = 0;
    over = false;
    tilt = null;
    sensorSeen = false;
    manualBox.hidden = true;

    buildPool();

    if (!pool.length) {
      readyTeam.textContent = 'Nessuna parola disponibile';
      showView('ready');
      return;
    }

    window.removeEventListener('deviceorientation', onOrientation);  // evita doppioni al "Rigioca"
    window.addEventListener('deviceorientation', onOrientation);
    startTurn();
  }

  function quitMatch() {
    running = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    clearTimers();
    releaseAwake();
    flash(null);
    manualBox.hidden = true;
    window.removeEventListener('deviceorientation', onOrientation);
    stage.classList.remove('is-rot-cw', 'is-rot-ccw');
    stage.dataset.rot = '';
    if (window.QuizHead && window.QuizHead.goToSetup) window.QuizHead.goToSetup();
  }

  /* ----------------------------------------------------------- listener --- */

  document.addEventListener('quizhead:start', function (e) { startMatch(e.detail); });

  $('#btn-ready').addEventListener('click', function () {
    beep(440, 0.05);           // sblocca l'AudioContext dentro il gesto utente
    countdown();
  });

  $('#btn-next').addEventListener('click', nextTurn);
  btnAgain.addEventListener('click', function () {
    if (over) startMatch(config);   // nuova partita con le stesse impostazioni
    else startTurn();               // si riparte col giro successivo
  });
  $('#btn-quit').addEventListener('click', quitMatch);
  $('#btn-home').addEventListener('click', quitMatch);

  manualBox.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-answer]');
    if (btn) answer(btn.dataset.answer === 'hit');
  });

  // Comodità per provare il round da desktop.
  document.addEventListener('keydown', function (e) {
    if (!running) return;
    if (e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); answer(true); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); answer(false); }
  });
})();
