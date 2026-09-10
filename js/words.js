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
    "Cleopatra", "Prima Guerra Mondiale", "Seconda Guerra Mondiale", "Guerra Fredda",
    "Caduta del Muro di Berlino", "Cristoforo Colombo", "Rinascimento", "Medioevo",
    "Antico Egitto", "Piramidi di Giza", "Marco Polo", "Leonardo da Vinci",
    "Crociate", "Peste Nera", "Magna Carta", "Rivoluzione Industriale",
    "Rivoluzione Americana", "Guerra di Secessione", "Risorgimento", "Giuseppe Garibaldi",
    "Camillo Benso di Cavour", "Unità d'Italia", "Benito Mussolini", "Adolf Hitler",
    "Resistenza partigiana", "25 Aprile", "Sbarco in Normandia", "Bomba di Hiroshima",
    "Sbarco sulla Luna", "Crisi dei missili di Cuba", "Mahatma Gandhi",
    "Martin Luther King", "Nelson Mandela", "Apartheid", "Guerra del Vietnam",
    "Rivoluzione Russa", "Lenin", "Stalin", "Zar Nicola II", "Titanic",
    "Grande Depressione", "Alessandro Magno", "Sparta", "Battaglia delle Termopili",
    "Attila", "Carlo Magno", "Sacro Romano Impero", "Repubblica di Venezia",
    "Scoperta dell'America", "Santa Inquisizione", "Guerra dei Cent'anni",
    "Giovanna d'Arco", "Rivolta di Spartaco", "Colosseo", "Via della Seta",
    "Trattato di Versailles"
  ],

  /* ---------------------------------------------------------- filosofia -- */
  filosofia: [
    "Socrate", "Platone", "Aristotele", "Cartesio", "Immanuel Kant",
    "Friedrich Nietzsche", "Hegel", "Karl Marx", "Jean-Paul Sartre",
    "Simone de Beauvoir", "Hannah Arendt", "Niccolò Machiavelli", "Giordano Bruno",
    "Baruch Spinoza", "John Locke", "Thomas Hobbes", "Jean-Jacques Rousseau",
    "David Hume", "Arthur Schopenhauer", "Søren Kierkegaard", "Martin Heidegger",
    "Ludwig Wittgenstein", "Michel Foucault", "Epicuro", "Zenone", "Diogene",
    "Pitagora", "Eraclito", "Parmenide", "Talete", "Democrito", "Sant'Agostino",
    "San Tommaso d'Aquino", "Erasmo da Rotterdam", "Blaise Pascal", "Voltaire",
    "Leibniz", "Auguste Comte", "Il mito della caverna", "Cogito ergo sum",
    "Imperativo categorico", "Il superuomo", "Dialettica", "Maieutica",
    "Empirismo", "Razionalismo", "Idealismo", "Nichilismo", "Stoicismo",
    "Esistenzialismo", "Utilitarismo", "Relativismo", "Libero arbitrio",
    "Metafisica", "Il contratto sociale", "Tabula rasa", "Rasoio di Occam",
    "Dilemma del carrello", "So di non sapere", "Eterno ritorno"
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
    "Aorta", "Globuli rossi", "Globuli bianchi", "Piastrine", "Neurone",
    "Midollo spinale", "Nervo sciatico", "Cervelletto", "Retina", "Timpano",
    "Papille gustative",

    // Reparto goliardico: sempre anatomia, ma di quella che fa ridere.
    "Sburra", "Scoreggia", "Rutto", "Peto silenzioso", "Caccola", "Moccio",
    "Cerume", "Cispa", "Catarro", "Brufolo", "Punto nero", "Forfora",
    "Sudore ascellare", "Alito pesante", "Piedi puzzolenti", "Ascella",
    "Maniglie dell'amore", "Doppio mento", "Pancetta", "Cellulite",
    "Smagliature", "Emorroidi", "Prostata", "Testicoli", "Scroto", "Pene",
    "Peli pubici", "Clitoride", "Utero", "Ovaie", "Mestruazioni", "Erezione",
    "Sperma", "Placenta", "Cordone ombelicale", "Ombelico", "Capezzolo",
    "Chiappe", "Sfintere", "Ano", "Coccige", "Ugola", "Tonsille", "Appendice",
    "Singhiozzo", "Starnuto", "Sbadiglio", "Pelle d'oca", "Crampo notturno",
    "Livido", "Callo", "Unghia incarnita", "Verruca", "Borborigmo", "Peluria"
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
    "Eclissi solare", "Maree", "Tettonica a placche", "Terremoto", "Vulcano",
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

    "Python", "JavaScript", "Java", "C++", "Rust", "Go", "TypeScript", "PHP",
    "SQL", "HTML", "CSS", "React", "Angular", "Vue.js", "Node.js",
    "Spring Boot", "Django", "Docker", "Kubernetes", "Git", "GitHub",
    "MySQL", "PostgreSQL", "MongoDB", "Redis", "Firebase", "API REST",
    "GraphQL", "Microservizi", "Pattern Singleton", "Pattern Observer",
    "Pattern Factory", "Model View Controller", "Ricorsione", "Puntatore",
    "Compilatore", "Machine Learning", "Rete neurale",
    "Intelligenza artificiale", "Blockchain", "Cloud computing", "Firewall",
    "Crittografia", "Stack Overflow", "Merge conflict", "Localhost",
    "Codice spaghetti", "Refactoring", "Debugging", "Linux",
    "Macchina di Turing", "Algoritmo di Dijkstra", "Complessità computazionale",
    "Albero binario", "Hash table", "Buffer overflow", "Garbage collector",
    "Kernel panic"
  ],

  /* -------------------------------------------------------------- mimo --- */
  mimo: [
    "Fare squat in palestra", "Guidare nel traffico", "Lavarsi i denti",
    "Ballare la macarena", "Suonare la chitarra", "Stendere la pizza",
    "Nuotare a rana", "Fare le valigie", "Cambiare una gomma bucata",
    "Infilare il filo nell'ago", "Mangiare gli spaghetti",
    "Aprire una bottiglia di spumante", "Fare una foto di gruppo",
    "Portare a spasso il cane", "Stirare una camicia",
    "Salire le scale con le buste della spesa", "Fare surf",
    "Scalare una montagna", "Pescare con la canna", "Giocare a tennis",
    "Tirare un rigore", "Fare la ruota", "Truccarsi allo specchio",
    "Asciugarsi i capelli col phon", "Rispondere al telefono",
    "Digitare furiosamente al computer", "Stendere il bucato",
    "Passare l'aspirapolvere", "Innaffiare le piante", "Sbucciare una banana",
    "Bere un caffè bollente", "Fare le bolle di sapone",
    "Dirigere un'orchestra", "Fare karate", "Camminare controvento",
    "Scivolare sul ghiaccio", "Spegnere la sveglia la mattina",
    "Cercare le chiavi nella borsa", "Fare yoga", "Mungere una mucca",
    "Remare in barca", "Andare in bici in salita", "Giocare a bowling",
    "Lanciare le freccette", "Provare vestiti in camerino",
    "Fare la fila alle poste", "Mangiare un gelato che si scioglie",
    "Montare un mobile IKEA", "Sbadigliare per la noia",
    "Litigare al telefono", "Impastare una torta", "Soffiare le candeline",
    "Spalare la neve", "Arrampicarsi su un albero",
    "Fare la spesa al supermercato", "Applaudire in piedi",
    "Fotografare un tramonto", "Cadere dalle scale", "Fare autostop",
    "Giocare a nascondino"
  ],

  /* ----------------------------------------------------------- canzoni --- */
  // Lista chiusa, fornita a mano: sostituisce del tutto quella generata.
  canzoni: [
    "Blurred Lines", "Daddy Cool", "DAVVERODAVVERO", "Boss", "OSSESSIONE",
    "Flow Extendo", "Non la Sopporto", "PA QUE LO BAILES (BAILALO ROCKY)",
    "Rock That Body", "Miami Vice", "DEM", "Charger", "TU VAS SIN (fav)",
    "FW/SS25 (Freestyle)", "TOP G", "Lo stelliere", "Massafghanistan",
    "AYAHUASCA", "Duro De Verdad pt.2", "Scama", "Body",
    "Damn I Love Miami", "Parado no Bailão", "Lo Stadio", "Shake Body",
    "MOVIE", "The Largest", "SPIDER", "Nias In Paris", "Shekini", "MON BÉBÉ",
    "Stupida sfortuna", "STUPIDA", "Pilé - Gospel", "SWAG MUSIC",
    "La Dueña del Swing", "SOGNO AMERICANO",
    "Afro Trap Pt. 7 (La puissance)", "Afro Trap Pt. 3 (Champions League)",
    "Gangnam Style (강남스타일)", "Made In Romania", "Splinter Cell", "Maladie",
    "Bam Bam", "P.E.S.", "Kriminal", "S.P.Q.R.", "Marina",
    "Andiamo A Comandare", "VRP", "Maledetta primavera", "Roma - Bangkok",
    "Perdo le parole", "Maracanã", "El Party", "Magnifico",
    "Senza Pagare VS T-Pain", "Vorrei ma non posto", "Tranne Te", "MIU MIU",
    "30°C", "TT LE GIRLZ", "Espresso Macchiato", "Lola",
    "Che Ne Sanno I 2000", "50 Special", "Gli anni (96)",
    "Il Più Grande Spettacolo Dopo Il Big Bang", "Un Raggio Di Sole",
    "Baciami Ancora", "Rozzi", "Auto tedesca", "Albachiara", "Sally",
    "ADVICE", "Non è Easy", "Stavo Pensando A Te", "Le Donne", "BTX Posse",
    "VAI DISA!", "Insta Lova", "La Nuova Stella Di Broadway", "Portofino",
    "Pettinero", "Settimana Bianca", "Tessera sanitaria",
    "Wellerman - Sea Shanty", "Problem Solver", "BIANCA", "BAMBOLA",
    "Tip Tap", "Più bella cosa", "Sere nere", "il ritmo delle cose.",
    "Apparecchiato", "CAFFÈ AMARO", "MILANO TESTAROSSA", "Gotham",
    "TU CON CHI FAI L'AMORE", "Call Me Maybe",
    "Set Fire to the Rain", "Someone Like You", "Skyfall", "Smack That",
    "Gimme More", "Beauty And A Beat", "I Kissed A Girl", "Hot N Cold",
    "Teenage Dream", "Last Friday Night (T.G.I.F.)", "Firework",
    "The One That Got Away"
  ],

  /* ---------------------------------------------------------- serie tv --- */
  serietv: [
    "Breaking Bad", "Better Call Saul", "Il Trono di Spade", "La Casa di Carta",
    "Stranger Things", "Friends", "How I Met Your Mother",
    "The Big Bang Theory", "The Office", "Lost", "Dexter", "The Walking Dead",
    "Black Mirror", "Squid Game", "Peaky Blinders", "Narcos", "Suits",
    "Sherlock", "Dr. House", "Grey's Anatomy", "Prison Break", "Twin Peaks",
    "I Soprano", "The Wire", "Mad Men", "True Detective", "Fargo", "Westworld",
    "The Mandalorian", "The Last of Us", "Chernobyl", "The Crown",
    "Bridgerton", "Downton Abbey", "Gomorra", "Romanzo Criminale", "Suburra",
    "Mare Fuori", "L'amica geniale", "Il commissario Montalbano", "Don Matteo",
    "Un medico in famiglia", "I Cesaroni", "Boris", "Vikings", "The Witcher",
    "Rick and Morty", "I Simpson", "Futurama", "South Park", "I Griffin",
    "BoJack Horseman", "Scrubs", "Seinfeld", "Modern Family",
    "Brooklyn Nine-Nine", "Ted Lasso", "Euphoria", "Sex Education", "Elite",
    "Dark", "Ozark", "Mindhunter", "You", "Mercoledì", "The Boys",
    "X-Files", "E.R. Medici in prima linea",
    "Willy, il principe di Bel-Air", "Happy Days"
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
