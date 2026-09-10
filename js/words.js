/* ==========================================================================
   QuizHead — word bank
   Le chiavi di questo oggetto DEVONO combaciare con gli id in CATEGORIES
   (js/app.js). Aggiungere una categoria = aggiungere una voce qui + una là.
   ========================================================================== */

window.QuizHead = window.QuizHead || {};

window.QuizHead.words = {

  /* ------------------------------------------------------------- storia -- */
  storia: [
    "Rivoluzione Francese", "Impero Romano", "Giulio Cesare", "Napoleone Bonaparte",
    "Rosa Parks", "Prima Guerra Mondiale", "Seconda Guerra Mondiale", "Guerra Fredda",
    "Caduta del Muro di Berlino", "Cristoforo Colombo", "Charles Dickens", "Medioevo",
    "Mao Zedong", "Fascismo", "Marco Polo", "Leonardo da Vinci",
    "Crociate", "Peste", "Magna Carta", "Rivoluzione Industriale",
    "Leonardo da Vinci", "Piano Marshall", "Risorgimento", "Napoleone",
    "Camillo Benso di Cavour", "Unità d'Italia", "Benito Mussolini", "Adolf Hitler",
    "Resistenza partigiana", "25 Aprile", "Albert Einstein", "Hiroshima",
    "Neil Armstrong", "Romolo e Remo", "Mahatma Gandhi",
    "Martin Luther King", "Nelson Mandela", "Dante Alighieri", "Guerra del Vietnam",
    "Rivoluzione Russa", "Lenin", "Stalin", "Franklin D. Roosevelt", "Titanic",
    "Grande Depressione", "Alessandro Magno", "Potenze dell'Asse", "Martin Lutero", "Riforma Protestante",
    "Attila", "Carlo Magno", "Sacro Romano Impero", "Big Bang",
    "Scoperta dell'America", "Papa Francesco", "Guerra dei Cent'anni",
    "Giovanna d'Arco", "Anarchia", "Colosseo", "Via della Seta",
    "Trattato di Versailles", "Proibizionismo"
  ],

  /* ---------------------------------------------------------- filosofia -- */
  filosofia: [
    "Socrate", "Platone", "Aristotele", "Karl Marx", "Friedrich Nietzsche", 
    "Pitagora", "Cartesio", "Sigmund Freud", "Seneca", "Galileo Galilei", 
    "Il mito della caverna", "Penso dunque sono", "So di non sapere", 
    "Carpe Diem", "Essere o non essere", "Il senso della vita", 
    "Karma", "Yin e Yang", "Libero arbitrio", "Destino", 
    "Anima", "Coscienza", "Inconscio", "Il bene e il male", 
    "Utopia", "Illuminismo", "Pessimismo", "Stoicismo", "Ateismo", 
    "Buddismo", "Meditazione", "Inconscio", "Complesso di Edipo", "The Truman Show", 
    "Il superuomo", "Dei dell'Olimpo", "Déjà vu", 
    "Dilemma morale", "Comunismo", "Capitalismo", "Ragione", 
    "Istinto", "Filosofia Orientale", "Zen", "Mantra", 
    "Ottimismo", "Cinismo", "Empatia", "Etica", "Dio è morto"
  ],

  /* ---------------------------------------------------------- anatomia --- */
  anatomia: [
    // Corpo di tutti i giorni: le parole facili che tengono vivo il turno.
    "Testa", "Capelli", "Fronte", "Sopracciglia", "Ciglia", "Occhio", "Naso",
    "Bocca", "Labbra", "Denti", "Lingua", "Guancia", "Mento", "Orecchio",
    "Collo", "Nuca", "Spalla", "Braccio", "Gomito", "Polso", "Mano", "Dita",
    "Pollice", "Mignolo", "Unghie", "Petto", "Schiena", "Pancia", "Fianchi",
    "Anca", "Coscia", "Ginocchio", "Gamba", "Caviglia", "Piede", "Tallone",
    "Alluce", "Pelle", "Barba", "Cervicale",

    // Organi e strutture: più impegnative, ma tutte di uso comune.
    "Cuore", "Cervello", "Polmoni", "Fegato", "Reni", "Stomaco", "Intestino",
    "Pancreas", "Milza", "Cistifellea", "Esofago", "Trachea", "Diaframma",
    "Vescica", "Tiroide", "Femore", "Tibia", "Clavicola", "Scapola", "Sterno",
    "Costole", "Colonna vertebrale", "Bacino", "Rotula", "Cranio", "Mandibola",
    "Bicipite", "Tricipite", "Quadricipite", "Polpaccio", "Gluteo",
    "Addominali", "Tendine d'Achille", "Legamento crociato", "Menisco",
    "Globuli rossi", "Globuli bianchi", "Piastrine", "Neurone",
    "Midollo spinale", "Nervo sciatico", "Cervelletto", "Retina", "Timpano",
    "Papille gustative",

    // Reparto goliardico: sempre anatomia, ma di quella che fa ridere.
    "Sborra", "Scoreggia", "Rutto", "Caccola", "Moccio",
    "Cerume", "Catarro", "Brufolo", "Punto nero", "Forfora",
    "Sudore", "Alito pesante", "Piedi puzzolenti", "Ascella", "Doppio mento", "Cellulite",
    "Smagliature", "Emorroidi", "Prostata", "Testicoli", "Scroto", "Pene",
    "Peli pubici", "Clitoride", "Utero", "Ovaie", "Mestruazioni", "Erezione",
    "Sperma", "Placenta", "Cordone ombelicale", "Ombelico", "Capezzolo",
    "Chiappe", "Sfintere", "Ano", "Coccige", "Ugola", "Tonsille", "Appendice",
    "Singhiozzo", "Starnuto", "Sbadiglio", "Pelle d'oca", "Crampo notturno",
    "Livido", "Callo", "Unghia incarnita", "Verruca", "Peluria"
  ],

  /* ----------------------------------------------------------- scienze --- */
  scienze: [
    "Fotosintesi clorofilliana", "Mitosi", "Meiosi", "DNA", "RNA", "Cromosoma",
    "Gene", "Mutazione genetica", "Evoluzione", "Charles Darwin",
    "Selezione naturale", "Cellula", "Mitocondrio", "Ribosoma", "Batterio",
    "Virus", "Vaccino", "Anticorpo", "Ecosistema", "Catena alimentare",
    "Fotone", "Forza di gravità", "Isaac Newton", "Albert Einstein",
    "Teoria della relatività", "Buco nero", "Big Bang", "Via Lattea",
    "Supernova", "Sistema solare", "Marte", "Giove", "Saturno", "Cometa",
    "Eclissi solare", "Maree", "Charles Darwin", "Terremoto", "Vulcano",
    "Effetto serra", "Riscaldamento globale", "Buco nell'ozono",
    "Ciclo dell'acqua", "Evaporazione", "Tavola periodica", "Idrogeno",
    "Ossigeno", "Carbonio", "Atomo", "Elettrone", "Neutrone", "Molecola",
    "Reazione chimica", "Acidi e basi", "Energia cinetica", "Elettromagnetismo",
    "Corrente elettrica", "Radioattività", "Fissione nucleare",
    "Fusione nucleare", "Velocità della luce", "Onde sonore"
  ],

  /* -------------------------------------------------------- informatica -- */
  // I primi 21 termini sono gli esami del corso: restano sempre in lista.
  informatica: [
    "Algebra e Matematica Discreta", "Analisi Matematica",
    "Architettura degli Elaboratori", "Logica", "Programmazione",
    "Sistemi Operativi", "Lingua Inglese B2 (Abilità Ricettive)",
    "Algoritmi e Strutture Dati", "Automi e Linguaggi Formali", "Basi di Dati",
    "Calcolo Numerico", "Probabilità e Statistica", "Programmazione ad Oggetti",
    "Reti di Calcolatori", "Cybersecurity: Principles and Practices",
    "Metodi e Tecnologie per lo Sviluppo Software", "Ingegneria del Software",
    "Ricerca Operativa", "Tecnologie Web", "Diritto, Informatica e Società",
    "Paradigmi di Programmazione",
  ],

  /* -------------------------------------------------------------- mimo --- */
  mimo: [
    "Fare squat", "Guidare", "Lavarsi i denti", "Suonare la chitarra", "Mescolare",
    "Nuotare a rana", "Fare le valigie",
    "Infilare il filo nell'ago", "Mangiare gli spaghetti",
    "Aprire una bottiglia di vino", "Fare una foto di gruppo", "Stirare",
    "Salire le scale", "Fare surf",
    "Scalare una montagna", "Pescare", "Giocare a tennis", "Fare la ruota", "Truccarsi",
    "Asciugarsi i capelli", "Rispondere al telefono", "Stendere il bucato",
    "Passare l'aspirapolvere", "Innaffiare le piante", "Sbucciare una banana",
    "Bere un caffè", "Fare le bolle di sapone",
    "Dirigere un'orchestra", "Fare karate",
    "Scivolare", "Spegnere la sveglia la mattina", "Fare yoga", "Mungere una mucca",
    "Remare in barca", "Andare in bici in salita", "Giocare a bowling",
    "Lanciare le freccette",
    "Fare la fila alle poste", "Mangiare un gelato che si scioglie",
    "Litigare al telefono", "Impastare una torta", "Soffiare le candeline",
    "Spalare la neve", "Arrampicarsi su un albero"
  ],

  /* ----------------------------------------------------------- canzoni --- */
  // Lista chiusa, fornita a mano: sostituisce del tutto quella generata.
  canzoni: [
    "Blurred Lines", "Daddy Cool", "DAVVERODAVVERO", "Boss", "OSSESSIONE",
    "Non la Sopporto", "PA QUE LO BAILES (BAILALO ROCKY)", "Rock That Body",
    "Miami Vice", "DEM", "TOP G", "Lo stelliere", "Massafghanistan",
    "AYAHUASCA", "Lo Stadio", "Stupida sfortuna", "STUPIDA",
    "SOGNO AMERICANO", "Afro Trap Pt. 7 (La puissance)",
    "Afro Trap Pt. 3 (Champions League)", "Gangnam Style", "Bam Bam",
    "Kriminal", "S.P.Q.R.", "Marina", "Andiamo A Comandare",
    "Maledetta primavera", "Roma - Bangkok", "Perdo le parole", "Maracanã",
    "El Party", "Magnifico", "Senza Pagare VS T-Pain", "Vorrei ma non posto",
    "Tranne Te", "MIU MIU", "TT LE GIRLZ", "Espresso Macchiato", "Lola",
    "Che Ne Sanno I 2000", "50 Special", "Gli anni (96)",
    "Il Più Grande Spettacolo Dopo Il Big Bang", "Un Raggio Di Sole",
    "Baciami Ancora", "Rozzi", "Auto tedesca", "Albachiara", "Sally",
    "ADVICE", "Non è Easy", "Stavo Pensando A Te", "Le Donne", "BTX Posse",
    "VAI DISA!", "Insta Lova", "La Nuova Stella Di Broadway", "Portofino",
    "Pettinero", "Settimana Bianca", "Tessera sanitaria",
    "Wellerman - Sea Shanty", "BIANCA", "BAMBOLA", "Più bella cosa",
    "Sere nere", "il ritmo delle cose.", "Apparecchiato", "CAFFÈ AMARO",
    "MILANO TESTAROSSA", "Gotham", "TU CON CHI FAI L'AMORE", "Call Me Maybe",
    "Set Fire to the Rain", "Someone Like You", "Skyfall", "Smack That",
    "Gimme More", "Beauty And A Beat", "I Kissed A Girl", "Hot N Cold",
    "Teenage Dream", "Last Friday Night (T.G.I.F.)", "Firework",
    "The One That Got Away",

    // Grandi classici: quelli che parte a canticchiarli anche chi non li sa.
    "Volare", "Azzurro", "L'italiano", "Bella ciao", "Con te partirò",
    "Sarà perché ti amo", "Maracaibo", "Gloria", "Felicità",
    "Vita spericolata", "La canzone del sole", "Vamos a la playa",
    "L'estate sta finendo", "Notti magiche", "La solitudine", "Laura non c'è",
    "Bohemian Rhapsody", "Imagine", "Hey Jude", "Billie Jean", "Thriller",
    "Wonderwall", "Smells Like Teen Spirit", "Sweet Child O' Mine",
    "Hotel California", "I Will Survive", "Dancing Queen", "Y.M.C.A.",
    "Sweet Caroline", "Africa", "Take On Me", "Never Gonna Give You Up",
    "We Will Rock You", "Macarena"
  ],

  /* ----------------------------------------------------------- persone --- */
  // Lista chiusa, fornita a mano: non generare né aggiungere nomi qui.
  persone: [
    "Popular boy", "Marta", "Sara", "Granzi", "Mila", "Rav", "Ele", "Diego",
    "Max De Leoni", "Nick Nava", "Claudio Palazzi", "Paolo Musolino",
    "Francesco Ranzato", "Marco Zanella", "Gavazzo, Ballan, Da San Martino",
    "Scatolina", "Shiva", "Luisa Maria Emilia Maietti", "Tullio Vardanega",
    "Riccardo Cardin", "Ombretta Gaggi", "Il Botang", "Andrea Fistarol",
    "Ragazzo cappellino", "Tipa del ragazzo con il cappellino",
    "Bene sorella Mila", "Carlotta sorella Mila", "Bumba", "Luciano Bellet",
    "Aurora Borsoi", "Clara Vicari", "Davide Faccio (Casarin)",
    "Vassallo/Valvassore", "Matteo Mattia M&M's (Gold)", "Marino Marini",
    "PAOLO FUOCO", "Sara ex Granzi",

    // Personaggi pubblici (cronaca e politica).
    "Berlusconi", "Salvini", "Schlein", "P Diddy", "Epstein", "Bossetti",
    "Yara Gambirasio", "Filippo Turetta"
  ]
};
