---
description: "Coding-Richtlinien für Duopingo: Leicht verständlicher, dokumentierter Code mit klarer Struktur"
---

# Duopingo — Coding Guidelines

## 🎯 Qualitätsanforderungen

- **Leicht verständlich**: Code muss für 15-17-jährige Anfänger verständlich sein
- **Übersichtliche Struktur**: Klare Logik, gute Einrückung, logische Blöcke
- **Dokumentation**: Deutsche Kommentare, die das **Warum** erklären, nicht nur das Wie
- **Modernes JS**: `const`/`let` (kein `var`), Arrow Functions, Template Literals

## 🛠️ Technischer Stack

- **Vanilla JS, HTML5, CSS3** — Keine Frameworks (No React, no Vue, no webpack)
- **Single-Page-Architektur** — Alle Screens sind `<section>`-Tags
- **CSS-Klassen zum Umschalten** — `.hidden`, `.active` für Screen-Wechsel
- **Getrennte Dateien** — `index.html`, `styles.css`, `script.js`

## 📝 Code-Stil

### HTML
```html
<!-- Screens: Jeder Screen ist ein Section -->
<section id="screen-name" class="screen active">
    <!-- ... content ... -->
</section>
```

### CSS
```css
/* Deutsche Kommentare für komplexe Logik */
.hidden {
    display: none;
}

.screen.active {
    display: block;
}
```

### JavaScript
```javascript
// Kurze, aussagekräftige deutsche Kommentare
// Erkläre das Warum, nicht das Wie

const showScreen = (screenId) => {
    // Alle Screens verstecken
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden');
    });
    
    // Gewünschten Screen anzeigen
    const screen = document.getElementById(screenId);
    screen.classList.remove('hidden');
    screen.classList.add('active');
};
```

## 📋 Checkliste für neuen Code

- [ ] Problem/Anforderung ist klar verstanden
- [ ] Code ist modular und in kleine Funktionen unterteilt
- [ ] Jede Funktion hat einen deutschen Kommentar (Zweck + Logik)
- [ ] Variable und Funktionsnamen sind aussagekräftig
- [ ] Keine Magic Numbers — wichtige Werte als `const` definieren
- [ ] Responsive Design (mobile-first)
- [ ] Keine Browser-Konsolen-Fehler

## 🎓 Anfänger-freundliche Erklärungen

Wenn komplexe Features verwendet werden:
- Arrow Functions: `() => {}` ist wie `function() {}`
- Template Literals: `` `Hallo ${name}` `` ist wie `"Hallo " + name`
- `const`/`let`: `const` ist unveränderlich, `let` ist veränderlich
