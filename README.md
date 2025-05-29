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