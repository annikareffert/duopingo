// Verlauf der besuchten Screens
let screenHistory = ['home'];

// Funktion zum Umschalten zwischen den verschiedenen Screens
function showScreen(screenId) {
    // Verhindere, dass der gleiche Screen erneut hinzugefügt wird
    if (screenHistory[screenHistory.length - 1] !== screenId) {
        screenHistory.push(screenId);
    }

    // 1. Alle Screens verstecken
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.add('hidden');
        screen.classList.remove('active');
    });

    // 2. Den gewünschten Screen anzeigen
    const activeScreen = document.getElementById(screenId);
    if (activeScreen) {
        activeScreen.classList.remove('hidden');
        activeScreen.classList.add('active');
    }
}

// Funktion zum Zurückgehen zur vorherigen Seite
function goBack() {
    if (screenHistory.length > 1) {
        // Entferne den aktuellen Screen aus dem Verlauf
        screenHistory.pop();
        // Gehe zum vorherigen Screen
        const previousScreen = screenHistory[screenHistory.length - 1];
        showScreen(previousScreen);
    }
}

// Funktion zum Umdrehen der Vokabel-Karten
function flipCard(card) {
    card.classList.toggle('flipped');
}

// Beim Start: Home-Screen anzeigen (wird automatisch durch CSS aktiviert)
// Der Pinguin ist automatisch klickbar und navigiert zu "building" via onclick