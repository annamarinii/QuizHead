/* ==========================================================================
   QuizHead — setup & bootstrap
   Step 1: configurazione partita, permessi sensori, passaggio alla vista gioco.
   Il loop di gioco vero e proprio arriverà in js/game.js.
   ========================================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------------------- dati -- */

  // Unica fonte di verità per le categorie: da qui nasceranno anche i word bank.
  var CATEGORIES = [
    { id: 'anatomia',    label: 'Anatomia',    icon: '🫀' },
    { id: 'storia',      label: 'Storia',      icon: '🏛️' },
    { id: 'filosofia',   label: 'Filosofia',   icon: '🧠' },
    { id: 'scienze',     label: 'Scienze',     icon: '🔬' },
    { id: 'canzoni',     label: 'Canzoni',     icon: '🎵' },
    { id: 'mimo',        label: 'Mimo',        icon: '🎭' },
    { id: 'informatica', label: 'Informatica', icon: '💻' },
    // Categoria "di casa": nomi di persone che conosciamo, forniti a mano.
    { id: 'persone',     label: 'Persone',     icon: '👥' }
  ];

  var STORAGE_KEY = 'quizhead:setup';

  var MIN_PLAYERS = 1;
  var MAX_PLAYERS = 8;
  var DEFAULT_PLAYERS = 3;

  var config = {
    teams: 2,
    rosters: [],          // [{ name, players: [] }], sempre lungo config.teams
    duration: 60,
    dares: true,
    categories: []
  };

  /* --------------------------------------------------------------- nodi --- */

  var $ = function (sel) { return document.querySelector(sel); };

  var screenSetup  = $('#screen-setup');
  var screenGame   = $('#screen-game');
  var chipsBox     = $('#chips-categories');
  var catCounter   = $('#cat-counter');
  var rostersBox   = $('#rosters');
  var daresBox     = $('#opt-dares');
  var roundsNote   = $('#rounds-note');
  var btnToggleAll = $('#btn-toggle-all');
  var btnStart     = $('#btn-start');
  var alertBox     = $('#setup-alert');

  window.QuizHead = window.QuizHead || {};

  /* ------------------------------------------------------------- utility -- */

  function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }

  function attr(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function buzz(ms) {
    if (navigator.vibrate) { try { navigator.vibrate(ms || 8); } catch (e) {} }
  }

  function showAlert(message, kind) {
    alertBox.textContent = message;
    alertBox.classList.toggle('is-info', kind === 'info');
    alertBox.hidden = false;
  }

  function hideAlert() {
    alertBox.hidden = true;
    alertBox.textContent = '';
  }

  /* ------------------------------------------------------ persistenza ----- */

  function loadConfig() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      var saved = JSON.parse(raw);
      if (typeof saved.teams === 'number') config.teams = clamp(saved.teams, 2, 8);
      if ([60, 90, 120].indexOf(saved.duration) !== -1) config.duration = saved.duration;
      if (typeof saved.dares === 'boolean') config.dares = saved.dares;

      if (Array.isArray(saved.rosters)) {
        config.rosters = saved.rosters.slice(0, 8).map(function (r) {
          var players = Array.isArray(r && r.players) ? r.players : [];
          players = players.slice(0, MAX_PLAYERS).map(function (p) { return String(p || ''); });
          while (players.length < MIN_PLAYERS) players.push('');
          return { name: String((r && r.name) || ''), players: players };
        });
      }
      if (Array.isArray(saved.categories)) {
        config.categories = saved.categories.filter(function (id) {
          return CATEGORIES.some(function (c) { return c.id === id; });
        });
      }
    } catch (e) {
      /* storage non disponibile (private mode): si parte dai default */
    }
  }

  function saveConfig() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(config)); } catch (e) {}
  }

  /* ---------------------------------------------------------- categorie --- */

  function renderCategories() {
    var html = CATEGORIES.map(function (cat) {
      var checked = config.categories.indexOf(cat.id) !== -1 ? ' checked' : '';
      return '<label class="chip">' +
               '<input type="checkbox" value="' + cat.id + '"' + checked + '>' +
               '<span class="chip__face"><i aria-hidden="true">' + cat.icon + '</i>' + cat.label + '</span>' +
             '</label>';
    }).join('');
    chipsBox.innerHTML = html;
  }

  function readCategories() {
    var boxes = chipsBox.querySelectorAll('input[type="checkbox"]');
    config.categories = Array.prototype.filter.call(boxes, function (b) { return b.checked; })
                                             .map(function (b) { return b.value; });
  }

  function syncCategoriesUI() {
    var n = config.categories.length;
    var isEmpty = n === 0;

    catCounter.textContent = isEmpty
      ? 'Seleziona almeno una categoria per iniziare'
      : n + (n === 1 ? ' categoria selezionata' : ' categorie selezionate');
    catCounter.classList.toggle('is-empty', isEmpty);

    btnToggleAll.textContent = n === CATEGORIES.length ? 'Deseleziona tutte' : 'Seleziona tutte';
    btnStart.disabled = isEmpty;
    if (!isEmpty) hideAlert();
  }

  /* ------------------------------------------------------------ rose --- */

  function makeRoster() {
    var players = [];
    while (players.length < DEFAULT_PLAYERS) players.push('');
    return { name: '', players: players };
  }

  /* Il numero di giri è dettato dalla squadra più numerosa: le squadre più
     piccole riciclano i propri giocatori. */
  function roundsCount() {
    return config.rosters.reduce(function (max, r) {
      return Math.max(max, r.players.length);
    }, 1);
  }

  function syncRosters() {
    while (config.rosters.length < config.teams) config.rosters.push(makeRoster());
    config.rosters.length = config.teams;
    renderRosters();
  }

  function renderRosters() {
    rostersBox.innerHTML = config.rosters.map(function (team, t) {
      var last = team.players.length <= MIN_PLAYERS;

      var rows = team.players.map(function (player, i) {
        return '<li class="roster__row">' +
                 '<input type="text" class="roster__player" maxlength="18" autocomplete="off"' +
                   ' value="' + attr(player) + '" placeholder="Giocatore ' + (i + 1) + '"' +
                   ' aria-label="Giocatore ' + (i + 1) + ' della squadra ' + (t + 1) + '"' +
                   ' data-team="' + t + '" data-player="' + i + '">' +
                 '<button type="button" class="roster__del" data-team="' + t + '" data-player="' + i + '"' +
                   ' aria-label="Togli il giocatore ' + (i + 1) + '"' + (last ? ' disabled' : '') + '>×</button>' +
               '</li>';
      }).join('');

      return '<div class="roster">' +
               '<input type="text" class="roster__team" maxlength="18" autocomplete="off"' +
                 ' value="' + attr(team.name) + '" placeholder="Squadra ' + (t + 1) + '"' +
                 ' aria-label="Nome della squadra ' + (t + 1) + '" data-team="' + t + '">' +
               '<ul class="roster__list">' + rows + '</ul>' +
               (team.players.length < MAX_PLAYERS
                 ? '<button type="button" class="linkbtn roster__add" data-team="' + t + '">+ Aggiungi giocatore</button>'
                 : '') +
             '</div>';
    }).join('');

    var giri = roundsCount();
    roundsNote.textContent = giri === 1
      ? 'Partita da 1 giro'
      : 'Partita da ' + giri + ' giri: ogni giocatore tiene il telefono una volta';
  }

  /* ------------------------------------------------------------ stepper --- */

  function setupSteppers(onChange) {
    var steppers = document.querySelectorAll('[data-stepper]');

    Array.prototype.forEach.call(steppers, function (el) {
      var key = el.dataset.stepper;
      var min = parseInt(el.dataset.min, 10);
      var max = parseInt(el.dataset.max, 10);
      var out = el.querySelector('.stepper__value');
      var btns = el.querySelectorAll('.stepper__btn');

      function paint() {
        out.textContent = config[key];
        Array.prototype.forEach.call(btns, function (b) {
          var step = parseInt(b.dataset.step, 10);
          b.disabled = config[key] + step < min || config[key] + step > max;
        });
      }

      Array.prototype.forEach.call(btns, function (b) {
        b.addEventListener('click', function () {
          config[key] = clamp(config[key] + parseInt(b.dataset.step, 10), min, max);
          buzz();
          paint();
          if (onChange) onChange(key);
          saveConfig();
        });
      });

      paint();
    });
  }

  /* -------------------------------------------------------------- timer --- */

  function setupDuration() {
    var radios = document.querySelectorAll('input[name="duration"]');

    Array.prototype.forEach.call(radios, function (r) {
      r.checked = parseInt(r.value, 10) === config.duration;
      r.addEventListener('change', function () {
        config.duration = parseInt(r.value, 10);
        buzz();
        saveConfig();
      });
    });
  }

  /* ---------------------------------------------------------- penitenze --- */

  function setupDares() {
    daresBox.checked = config.dares;
    daresBox.addEventListener('change', function () {
      config.dares = daresBox.checked;
      buzz();
      saveConfig();
    });
  }

  /* ------------------------------------------------------------ sensori --- */

  /**
   * iOS 13+ espone DeviceOrientationEvent.requestPermission() e pretende che
   * venga chiamata *dentro* un gesto utente e su origine sicura (HTTPS).
   * Android/desktop non la espongono: lì i sensori sono già disponibili.
   * Ritorna: 'granted' | 'denied' | 'unsupported' | 'error'
   */
  function requestSensorAccess() {
    var DOE = window.DeviceOrientationEvent;
    var DME = window.DeviceMotionEvent;

    if (!DOE) return Promise.resolve('unsupported');

    if (typeof DOE.requestPermission !== 'function') {
      return Promise.resolve('granted');
    }

    // Su iOS chiediamo anche il motion: servirà per lo scuotimento/anti-cheat.
    var motion = (DME && typeof DME.requestPermission === 'function')
      ? DME.requestPermission().catch(function () { return 'denied'; })
      : Promise.resolve('granted');

    return DOE.requestPermission()
      .then(function (state) {
        return motion.then(function () { return state === 'granted' ? 'granted' : 'denied'; });
      })
      .catch(function (err) {
        console.error('[QuizHead] requestPermission fallita:', err);
        return 'error';
      });
  }

  /* ------------------------------------------------------------ schermi --- */

  function goToGame() {
    screenSetup.hidden = true;
    screenGame.hidden = false;
    window.scrollTo(0, 0);

    // js/game.js prende di qui la configurazione e parte sull'evento.
    // Copia profonda: il motore non deve vedere le modifiche fatte al setup.
    window.QuizHead.config = Object.assign({}, config, {
      categories: config.categories.slice(),
      rosters: config.rosters.map(function (r) {
        return { name: r.name, players: r.players.slice() };
      })
    });
    document.dispatchEvent(new CustomEvent('quizhead:start', { detail: window.QuizHead.config }));
  }

  function goToSetup() {
    screenGame.hidden = true;
    screenSetup.hidden = false;
    btnStart.classList.remove('is-busy');
    btnStart.querySelector('span').textContent = 'Inizia a giocare';
    window.scrollTo(0, 0);
  }

  /* ----------------------------------------------------------- listener --- */

  /* Aggiorna il modello mentre si scrive, senza ridisegnare: un re-render
     a ogni tasto farebbe perdere il focus del campo. */
  rostersBox.addEventListener('input', function (e) {
    var el = e.target;
    var t = parseInt(el.dataset.team, 10);
    if (isNaN(t) || !config.rosters[t]) return;

    if (el.classList.contains('roster__team')) {
      config.rosters[t].name = el.value;
    } else if (el.classList.contains('roster__player')) {
      config.rosters[t].players[parseInt(el.dataset.player, 10)] = el.value;
    }
    saveConfig();
  });

  rostersBox.addEventListener('click', function (e) {
    var add = e.target.closest('.roster__add');
    var del = e.target.closest('.roster__del');

    if (add) {
      var t = parseInt(add.dataset.team, 10);
      if (config.rosters[t].players.length >= MAX_PLAYERS) return;
      config.rosters[t].players.push('');
      renderRosters();
      buzz();
      saveConfig();

      var fields = rostersBox.querySelectorAll('.roster__player[data-team="' + t + '"]');
      if (fields.length) fields[fields.length - 1].focus();

    } else if (del) {
      var dt = parseInt(del.dataset.team, 10);
      if (config.rosters[dt].players.length <= MIN_PLAYERS) return;
      config.rosters[dt].players.splice(parseInt(del.dataset.player, 10), 1);
      renderRosters();
      buzz();
      saveConfig();
    }
  });

  chipsBox.addEventListener('change', function () {
    readCategories();
    syncCategoriesUI();
    saveConfig();
    buzz();
  });

  btnToggleAll.addEventListener('click', function () {
    var selectAll = config.categories.length !== CATEGORIES.length;
    var boxes = chipsBox.querySelectorAll('input[type="checkbox"]');
    Array.prototype.forEach.call(boxes, function (b) { b.checked = selectAll; });
    readCategories();
    syncCategoriesUI();
    saveConfig();
    buzz(12);
  });

  btnStart.addEventListener('click', function () {
    if (btnStart.disabled) return;

    // La richiesta permessi parte per prima: su iOS l'attivazione utente
    // si perde se prima facciamo await su qualcos'altro.
    var pending = requestSensorAccess();

    hideAlert();
    btnStart.classList.add('is-busy');
    btnStart.querySelector('span').textContent = 'Attivo i sensori…';

    pending.then(function (state) {
      if (state === 'granted') {
        buzz(20);
        goToGame();
        return;
      }

      btnStart.classList.remove('is-busy');
      btnStart.querySelector('span').textContent = 'Inizia a giocare';

      if (state === 'denied') {
        showAlert('Permesso negato. Su iPhone: Impostazioni → Safari → Movimento e orientamento, poi ricarica la pagina.');
      } else if (state === 'unsupported') {
        showAlert('Sensori non disponibili su questo dispositivo: passo alla vista di gioco in modalità test.', 'info');
        setTimeout(goToGame, 1400);
      } else {
        showAlert('Non riesco ad attivare i sensori. Assicurati di aprire la pagina in HTTPS e riprova.');
      }
    });
  });

  /* -------------------------------------------------------------- init --- */

  window.QuizHead.CATEGORIES = CATEGORIES;
  window.QuizHead.goToSetup = goToSetup;   // usato da game.js per uscire

  loadConfig();
  renderCategories();
  syncCategoriesUI();
  syncRosters();
  setupSteppers(function (key) { if (key === 'teams') syncRosters(); });
  setupDuration();
  setupDares();
})();
