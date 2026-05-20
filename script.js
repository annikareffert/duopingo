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

// Aktuelle Karteikarten-Daten (können von JSON geladen werden)
let vocabCards = [
    { id: 1, english: 'Annoyed', german: 'genervt', explanation: 'Gefühl der Verärgerung oder Belästigung' },
    { id: 2, english: 'Dumb', german: 'dumm', explanation: 'Mangel an Intelligenz oder Klugheit' },
    { id: 3, english: 'Unfortunately', german: 'leider', explanation: 'Ausdruck des Bedauerns oder Unglücks' },
    { id: 4, english: 'Easy', german: 'leicht', explanation: 'Nicht schwierig oder einfach zu tun' },
    { id: 5, english: 'Long', german: 'lang, lange', explanation: 'Große Länge oder Dauer' }
];

// Funktion zum Löschen einer Karteikarte
function deleteCard(cardId) {
    vocabCards = vocabCards.filter(card => card.id !== cardId);
    renderCards();
}

// Funktion zum Hinzufügen einer neuen Karteikarte
function addCard() {
    const english = document.getElementById('input-english').value.trim();
    const german = document.getElementById('input-german').value.trim();
    const explanation = document.getElementById('input-explanation').value.trim();
    
    if (!english || !german) {
        alert('Bitte fülle die Pflichtfelder aus: Englisch und Deutsch');
        return;
    }
    
    const newCard = {
        id: Math.max(...vocabCards.map(c => c.id), 0) + 1,
        english: english,
        german: german,
        explanation: explanation || 'Keine Erklärung hinzugefügt'
    };
    
    vocabCards.push(newCard);
    
    // Formularfelder leeren
    document.getElementById('input-english').value = '';
    document.getElementById('input-german').value = '';
    document.getElementById('input-explanation').value = '';
    
    renderCards();
}

// Funktion zum Rendern der Karteikarten
function renderCards() {
    const container = document.getElementById('vocab-cards-container');
    if (!container) return;
    
    container.innerHTML = vocabCards.map(card => `
        <div class="vocab-card">
            <div class="card-content">
                <div class="card-header">
                    <div class="card-term">
                        <span class="label">Englisch:</span>
                        <span class="value">${card.english}</span>
                    </div>
                    <div class="card-translation">
                        <span class="label">Deutsch:</span>
                        <span class="value">${card.german}</span>
                    </div>
                </div>
                <div class="card-explanation">
                    <span class="label">Erklärung:</span>
                    <span class="value">${card.explanation}</span>
                </div>
                <button class="btn-delete" onclick="deleteCard(${card.id})" aria-label="Löschen">🗑️ Löschen</button>
            </div>
        </div>
    `).join('');
}

// Beim Start: Home-Screen anzeigen und Karteikarten rendern
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
});