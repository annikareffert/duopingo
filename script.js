// Funktion zum Umschalten zwischen den verschiedenen Screens
function showScreen(screenId) {
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

// Beim Start: Home-Screen anzeigen (wird automatisch durch CSS aktiviert)
// Der Pinguin ist automatisch klickbar und navigiert zu "building" via onclick