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

/* ========================
   KARTEIKARTEN-LERN-SYSTEM
   ======================== */

// Aktuelles Lernset und Tracking
let currentFlashcardSet = [];
let currentCardIndex = 0;
let learningStats = {
    correct: 0,
    wrong: 0,
    marked: new Set()
};

// Funktion: Starte Karteikarten-Lernen mit einem Set
function startFlashcardLearning(setId, setTitle) {
    // Nutze die vocabCards als Beispiel-Set
    currentFlashcardSet = [...vocabCards];
    
    // Wenn keine Karten vorhanden, zeige eine Warnung
    if (currentFlashcardSet.length === 0) {
        alert('Dieses Set hat noch keine Karteikarten. Bitte fügen Sie zuerst Karten hinzu!');
        return;
    }
    
    // Zurücksetzen des Fortschritts
    currentCardIndex = 0;
    learningStats = {
        correct: 0,
        wrong: 0,
        marked: new Set()
    };
    
    // Setze den Titel
    document.getElementById('flashcard-title').textContent = setTitle;
    
    // Zeige die erste Karte
    showFlashcard();
    
    // Wechsle zum Lern-Screen
    showScreen('flashcard-learn');
}

// Funktion: Zeige aktuelle Karteikarte
function showFlashcard() {
    if (currentCardIndex >= currentFlashcardSet.length) {
        // Alle Karten durch - Zeige Zusammenfassung
        showSummary();
        return;
    }
    
    const card = currentFlashcardSet[currentCardIndex];
    
    // Update Karteninhalte
    document.getElementById('flashcard-front-text').textContent = card.english;
    document.getElementById('flashcard-back-text').textContent = card.german;
    
    // Reset Flip-Status
    const flashcard = document.getElementById('current-flashcard');
    flashcard.classList.remove('flipped');
    
    // Update Fortschritt
    document.getElementById('current-card-number').textContent = currentCardIndex + 1;
    document.getElementById('total-cards').textContent = currentFlashcardSet.length;
    
    // Berechne Progress-Bar
    const progress = ((currentCardIndex + 1) / currentFlashcardSet.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    
    // Update Mark-Button-Status
    updateMarkButton();
    
    // Verstecke Zusammenfassung
    document.getElementById('summary-section').classList.add('hidden');
    document.querySelector('.flashcard-container').classList.remove('hidden');
    document.querySelector('.flashcard-actions').classList.remove('hidden');
}

// Funktion: Drehe die Karteikarte um
function flipCard() {
    const flashcard = document.getElementById('current-flashcard');
    flashcard.classList.toggle('flipped');
}

// Funktion: Markiere oder entmarkiere die aktuelle Karte
function toggleMarkCard() {
    const card = currentFlashcardSet[currentCardIndex];
    const markBtn = document.getElementById('mark-btn');
    
    if (learningStats.marked.has(card.id)) {
        // Entmarkieren
        learningStats.marked.delete(card.id);
        markBtn.classList.remove('marked');
    } else {
        // Markieren
        learningStats.marked.add(card.id);
        markBtn.classList.add('marked');
    }
}

// Funktion: Aktualisiere Mark-Button Status
function updateMarkButton() {
    const card = currentFlashcardSet[currentCardIndex];
    const markBtn = document.getElementById('mark-btn');
    
    if (learningStats.marked.has(card.id)) {
        markBtn.classList.add('marked');
    } else {
        markBtn.classList.remove('marked');
    }
}

// Funktion: Gehe zur nächsten Karte
function nextCard(result) {
    const card = currentFlashcardSet[currentCardIndex];
    
    // Tracking
    if (result === 'correct') {
        learningStats.correct++;
    } else if (result === 'wrong') {
        learningStats.wrong++;
    }
    
    // Nächste Karte
    currentCardIndex++;
    showFlashcard();
}

// Funktion: Zeige Zusammenfassung
function showSummary() {
    // Verstecke Karteikarte und Buttons
    document.querySelector('.flashcard-container').classList.add('hidden');
    document.querySelector('.flashcard-actions').classList.add('hidden');
    
    // Zeige Zusammenfassung
    document.getElementById('summary-section').classList.remove('hidden');
    
    // Aktualisiere Statistiken
    document.getElementById('correct-count').textContent = learningStats.correct;
    document.getElementById('wrong-count').textContent = learningStats.wrong;
    document.getElementById('marked-count').textContent = learningStats.marked.size;
}