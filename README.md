# NFC vCard App

Setup-Anleitung folgt...
## Projektsetup

1. **Repository klonen**
    ```bash
    git clone https://github.com/dein-benutzername/vcard-nfc-app.git
    cd vcard-nfc-app
    ```

2. **Abhängigkeiten installieren**
    ```bash
    npm install
    ```

3. **Umgebungsvariablen konfigurieren**  
    Erstelle eine `.env`-Datei im Projektverzeichnis und trage ggf. benötigte Variablen ein (siehe `.env.example`).

4. **Entwicklungsserver starten**
    ```bash
    npm run dev
    ```
    Die App ist dann meist unter [http://localhost:3000](http://localhost:3000) erreichbar.

5. **NFC-Funktion testen**  
    Stelle sicher, dass dein Gerät NFC unterstützt und aktiviere es. Folge den Anweisungen in der App, um vCards via NFC zu übertragen.

6. **Build für Produktion**
    ```bash
    npm run build
    npm start
    ```

## Weitere Hinweise

- Für Windows-Nutzer:  
  Nutze das Kommando `set NODE_OPTIONS=--openssl-legacy-provider && npm run dev`, falls es zu OpenSSL-Problemen kommt.
- Bei Fragen oder Problemen siehe [Issues](https://github.com/dein-benutzername/vcard-nfc-app/issues) oder erstelle ein neues Ticket.
set NODE_OPTIONS=--openssl-legacy-provider && 


# Farbgebungen
Hintergrund: Ein warmes Beige (#F5F5DC) 

Akzentfarbe: Ein sanftes Grau (#D3D3D3)

Textfarbe: Ein dunkles Anthrazit (#333333)


# GPT
Farbreferenz für das Kreativschicht-Theme
Primäre Farbpalette
Element	Farbcode	Anwendungsbereich
Primär Akzent	#FF6F61	CTA-Buttons, Sticky-Elemente
Dunkel Braun	#5d3a2e	Überschriften, wichtige Texte
Mittel Braun	#6b4c3b	Standardtexte, Beschreibungen
Dunkel Text	#3c2c23	Links, sekundäre Textelemente
Hintergrundfarben
Element	Farbcode	Anwendungsbereich
Haupt-Hintergrund	#fefaf7	Haupthintergrund der Seite
FOMO Banner	#ffe9e1	Hinweis/Promotion Banner
FAQ Bereich	#fff8f2	FAQ-Abschnitt Hintergrund
Karten/Elemente	#ffffff	Produktkarten, Bewertungen, About-Section
Schatten und Effekte
Box-Schatten für Karten: 0 4px 8px rgba(0,0,0,0.08)
Box-Schatten für Buttons: 0 4px 8px rgba(0,0,0,0.1)
Hover-Schatten für Produkte: 0 6px 12px rgba(0,0,0,0.15)
Text-Schatten für Hero-Texte: 0px 0px 10px rgba(255,255,255,0.9)
Typografie
Primäre Schriftart: 'Nunito', sans-serif
Überschriften: Bold/900, Dunkel Braun (#5d3a2e)
Texte: Regular, Mittel Braun (#6b4c3b)
Stile für UI-Elemente
Button-Border-Radius: 14px
Karten-Border-Radius: 16px und 8px (für Bilder)
Hover-Effekt für Produkte: transform: scale(1.05)


