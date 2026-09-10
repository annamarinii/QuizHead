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
    { id: 'serietv',     label: 'Serie TV',    icon: '📺' },
    // Categoria "di casa": nomi di persone che conosciamo, forniti a mano.
    { id: 'persone',     label: 'Persone',     icon: '👥' }
  ];

  var STORAGE_KEY = 'quizhead:setup';

  var config = {
    teams: 2,
    players: 3,
    duration: 60,
    categories: []
  };

  /* --------------------------------------------------------------- nodi --- */

  var $ = function (sel) { return document.querySelector(sel); };

  var screenSetup  = $('#screen-setup');
  var screenGame   = $('#screen-game');
  var chipsBox     = $('#chips-categories');
  var catCounter   = $('#cat-counter');
  var btnToggleAll = $('#btn-toggle-all');
  var btnStart     = $('#btn-start');
  var alertBox     = $('#setup-alert');

  window.QuizHead = window.QuizHead || {};

  /* ------------------------------------------------------------- utility -- */

  function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }

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
      if (typeof saved.teams === 'number')    config.teams = clamp(saved.teams, 2, 8);
      if (typeof saved.players === 'number')  config.players = clamp(saved.players, 1, 10);
      if ([60, 90, 120].indexOf(saved.duration) !== -1) config.duration = saved.duration;
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

  /* ------------------------------------------------------------ stepper --- */

  function setupSteppers() {
    var steppers = document.querySelectorAll('[data-stepper]');

    Array.prototype.forEach.call(steppers, function (el) {
      var key = el.dataset.stepper === 'teams' ? 'teams' : 'players';
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
    window.QuizHead.config = Object.assign({}, config, { categories: config.categories.slice() });
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
  setupSteppers();
  setupDuration();
})();
