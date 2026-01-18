# 🔧 Neue / geänderte Einstellungen

Diese Dokumentation beschreibt alle neuen und geänderten Konfigurationseinstellungen, die in diesem Pull Request hinzugefügt wurden.

---

## Zusammenfassung

Dieser PR führt ein **zentralisiertes Konfigurationssystem** ein, das:
- Alle Umgebungsvariablen an einem Ort definiert
- Type-Safety durch TypeScript bietet
- Validierung für erforderliche Einstellungen durchführt
- Standard-Werte für alle optionalen Einstellungen bereitstellt
- Feature-Flags für modulare Funktionssteuerung enthält

---

## Datenbank-Konfiguration

### `DB_SERVER` (string, **erforderlich**)
Datenbank-Servername oder IP-Adresse

**Typ:** `string`  
**Default:** Keiner (muss gesetzt werden)  
**Beschreibung:** Hostname oder IP des Microsoft SQL Server  
**Beispiel:** `bagtag-prod.database.windows.net`

### `DB_DATABASE` (string, **erforderlich**)
Name der Datenbank

**Typ:** `string`  
**Default:** Keiner (muss gesetzt werden)  
**Beschreibung:** Name der zu verwendenden Datenbank  
**Beispiel:** `bagtag-production`

### `DB_USER` (string, **erforderlich**)
Datenbank-Benutzername

**Typ:** `string`  
**Default:** Keiner (muss gesetzt werden)  
**Beschreibung:** Authentifizierungsbenutzername für Datenbankverbindung  

### `DB_PASSWORD` (string, **erforderlich**)
Datenbank-Passwort

**Typ:** `string`  
**Default:** Keiner (muss gesetzt werden)  
**Beschreibung:** Authentifizierungspasswort für Datenbankverbindung  
**Sicherheit:** Niemals in Versionskontrolle committen

### `DB_ENCRYPT` (boolean, optional)
SSL/TLS-Verschlüsselung für Datenbankverbindung

**Typ:** `boolean`  
**Default:** `true`  
**Beschreibung:** Aktiviert SSL/TLS-Verschlüsselung für sichere Datenbankverbindungen  
**Werte:** `true`, `false`, `1`, `0`  
**Produktiv:** Immer `true`

### `DB_TRUST_SERVER_CERTIFICATE` (boolean, optional)
Server-Zertifikat ohne Validierung vertrauen

**Typ:** `boolean`  
**Default:** `false`  
**Beschreibung:** Nur für Entwicklungsumgebungen! Umgeht Zertifikatsvalidierung  
**Werte:** `true`, `false`, `1`, `0`  
**Produktiv:** Immer `false`

---

## E-Mail-Konfiguration (Mailgun)

### `EMAIL_ENABLED` (boolean, optional)
Master-Schalter für E-Mail-Benachrichtigungen

**Typ:** `boolean`  
**Default:** `true`  
**Beschreibung:** Globale Aktivierung/Deaktivierung von E-Mail-Benachrichtigungen  
**Werte:** `true`, `false`, `1`, `0`

### `MAILGUN_API_KEY` (string, **erforderlich wenn E-Mail aktiviert**)
Mailgun API-Schlüssel

**Typ:** `string`  
**Default:** Leer wenn E-Mail deaktiviert  
**Beschreibung:** API-Schlüssel für Mailgun-Authentifizierung  
**Beispiel:** `key-1234567890abcdef1234567890abcdef`  
**Wie erhalten:** Mailgun Dashboard > Settings > API Keys  
**Sicherheit:** Niemals in Versionskontrolle committen

### `MAILGUN_DOMAIN` (string, **erforderlich wenn E-Mail aktiviert**)
Mailgun Versand-Domain

**Typ:** `string`  
**Default:** Leer wenn E-Mail deaktiviert  
**Beschreibung:** Die für den E-Mail-Versand konfigurierte Mailgun-Domain  
**Beispiel:** `mg.bag-tag.de` oder `sandboxXXXXX.mailgun.org`  
**Wie erhalten:** Mailgun Dashboard > Sending > Domains  
**Hinweis:** Für Produktion eigene Domain verwenden, für Tests Sandbox-Domain

### `MAILGUN_FROM_EMAIL` (string, **erforderlich wenn E-Mail aktiviert**)
Absender-E-Mail-Adresse

**Typ:** `string`  
**Default:** Fallback zu `EMAIL_FROM` (Standard: `noreply@bag-tag.de`)  
**Beschreibung:** E-Mail-Adresse des Absenders für alle Benachrichtigungen  
**Beispiel:** `noreply@bag-tag.de`  
**Hinweis:** Muss zur konfigurierten Mailgun-Domain passen

### `MAILGUN_FROM_NAME` (string, optional)
Anzeigename des Absenders

**Typ:** `string`  
**Default:** `Bag-Tag`  
**Beschreibung:** Anzeigename für E-Mail-Absender  
**Beispiel:** `Bag-Tag Notifications`  
**Format:** Wird als `"Name" <email@domain.com>` formatiert

---

## SMS-Konfiguration (Twilio)

### `SMS_ENABLED` (boolean, optional)
Master-Schalter für SMS-Benachrichtigungen

**Typ:** `boolean`  
**Default:** `true`  
**Beschreibung:** Globale Aktivierung/Deaktivierung von SMS-Benachrichtigungen  
**Werte:** `true`, `false`, `1`, `0`

### `TWILIO_ACCOUNT_SID` (string, **erforderlich wenn SMS aktiviert**)
Twilio Account SID

**Typ:** `string`  
**Default:** Leer wenn SMS deaktiviert  
**Beschreibung:** Twilio-Konto-Kennung für Authentifizierung  
**Beispiel:** `AC0295ce6b5749938d5f8f84b4b9303c92`  
**Wie erhalten:** Twilio Console Dashboard

### `TWILIO_AUTH_TOKEN` (string, **erforderlich wenn SMS aktiviert**)
Twilio Authentifizierungstoken

**Typ:** `string`  
**Default:** Leer wenn SMS deaktiviert  
**Beschreibung:** Geheimer Authentifizierungstoken für Twilio API  
**Beispiel:** `8c92154c5c078dd641257e54230b85e8`  
**Sicherheit:** Niemals in Versionskontrolle committen

### `TWILIO_SMS_FROM` (string, **erforderlich wenn SMS aktiviert**)
Absender-Telefonnummer für SMS

**Typ:** `string`  
**Default:** Fallback zu `TWILIO_FROM_NUMBER`  
**Beschreibung:** Telefonnummer für SMS-Versand  
**Beispiel:** `+49123456789`  
**Format:** Muss Ländercode mit `+` enthalten  
**Hinweis:** Nummer muss in Twilio registriert sein

---

## Sicherheitskonfiguration

### `NOTIFY_TOKEN_SECRET` (string, **erforderlich**)
Geheimer Schlüssel für Benachrichtigungstoken

**Typ:** `string`  
**Default:** Fallback zu `FUNCTION_APP_SECRET` (keiner wenn beide leer)  
**Beschreibung:** Secret für Signierung und Verifizierung von Sicherheitstoken  
**Generierung:** `openssl rand -base64 32`  
**Sicherheit:** Muss mindestens 32 Zeichen lang sein  
**Hinweis:** Token-Sicherheit hängt von Stärke dieses Secrets ab

### `NOTIFY_TOKEN_TTL_MS` (number, optional)
Gültigkeit von Benachrichtigungstoken

**Typ:** `number` (Millisekunden)  
**Default:** `600000` (10 Minuten)  
**Beschreibung:** Lebensdauer von Sicherheitstoken  
**Empfohlen:** 300000-900000 (5-15 Minuten)

### `RECAPTCHA_SECRET_KEY` (string, **erforderlich wenn reCAPTCHA aktiviert**)
Google reCAPTCHA Secret Key

**Typ:** `string`  
**Default:** Leer  
**Beschreibung:** Secret Key für Bot-Schutz via reCAPTCHA  
**Wie erhalten:** https://www.google.com/recaptcha/admin  
**Hinweis:** Nur erforderlich wenn `FEATURE_RECAPTCHA_VALIDATION=true`

---

## Rate-Limiting-Konfiguration

### `RATE_LIMIT_IP_MAX` (number, optional)
Maximale Anfragen pro IP-Adresse

**Typ:** `number`  
**Default:** `5`  
**Beschreibung:** Anzahl erlaubter Benachrichtigungen pro IP im Zeitfenster  
**Empfohlen:** 3-10

### `RATE_LIMIT_IP_WINDOW_MS` (number, optional)
Zeitfenster für IP-Rate-Limiting

**Typ:** `number` (Millisekunden)  
**Default:** `3600000` (1 Stunde)  
**Beschreibung:** Zeitfenster für IP-basierte Ratenbegrenzung  
**Empfohlen:** 1800000-7200000 (30 Min - 2 Std)

### `RATE_LIMIT_TAG_MAX` (number, optional)
Maximale Benachrichtigungen pro Tag

**Typ:** `number`  
**Default:** `3`  
**Beschreibung:** Anzahl erlaubter Benachrichtigungen pro Tag pro Tag  
**Empfohlen:** 2-5  
**Zweck:** Verhindert Spam an Tag-Besitzer

### `RATE_LIMIT_TAG_WINDOW_MS` (number, optional)
Zeitfenster für Tag-Rate-Limiting

**Typ:** `number` (Millisekunden)  
**Default:** `86400000` (24 Stunden)  
**Beschreibung:** Zeitfenster für Tag-basierte Ratenbegrenzung  
**Empfohlen:** 43200000-172800000 (12 Std - 2 Tage)

---

## Benachrichtigungskonfiguration

### `NOTIFICATION_MAX_MESSAGE_LENGTH` (number, optional)
Maximale Nachrichtenlänge

**Typ:** `number` (Zeichen)  
**Default:** `500`  
**Beschreibung:** Maximale Länge einer Benachrichtigungsnachricht  
**Empfohlen:** 300-1000  
**Zweck:** Verhindert Missbrauch und passt zu SMS/E-Mail-Limits

### `NOTIFICATION_TIMESTAMP_DRIFT_MS` (number, optional)
Maximale erlaubte Zeitabweichung

**Typ:** `number` (Millisekunden)  
**Default:** `900000` (15 Minuten)  
**Beschreibung:** Maximal erlaubte Zeitdifferenz für Zeitstempel  
**Empfohlen:** 600000-1800000 (10-30 Minuten)  
**Zweck:** Verhindert Replay-Attacken

---

## Feature-Flags

### `FEATURE_SMS_NOTIFICATIONS` (boolean, optional)
SMS-Benachrichtigungen Feature

**Typ:** `boolean`  
**Default:** `true`  
**Beschreibung:** Aktiviert SMS als Benachrichtigungskanal  
**Werte:** `true`, `false`, `1`, `0`  
**Hinweis:** Benötigt zusätzlich `SMS_ENABLED=true` und valide Twilio-Konfiguration

### `FEATURE_EMAIL_NOTIFICATIONS` (boolean, optional)
E-Mail-Benachrichtigungen Feature

**Typ:** `boolean`  
**Default:** `true`  
**Beschreibung:** Aktiviert E-Mail als Benachrichtigungskanal  
**Werte:** `true`, `false`, `1`, `0`  
**Hinweis:** Benötigt zusätzlich `EMAIL_ENABLED=true` und valide Mailgun-Konfiguration

### `FEATURE_ASYNC_NOTIFICATIONS` (boolean, optional)
Asynchrone Benachrichtigungsverarbeitung

**Typ:** `boolean`  
**Default:** `false`  
**Beschreibung:** Aktiviert asynchrone Verarbeitung (Background Jobs)  
**Status:** Noch nicht implementiert, für zukünftige Nutzung reserviert  
**Zweck:** Benachrichtigungen in Warteschlange statt blockierend zu verarbeiten

### `FEATURE_RECAPTCHA_VALIDATION` (boolean, optional)
reCAPTCHA-Validierung Feature

**Typ:** `boolean`  
**Default:** `false`  
**Beschreibung:** Aktiviert reCAPTCHA-Validierung für Benachrichtigungsanfragen  
**Werte:** `true`, `false`, `1`, `0`  
**Hinweis:** Benötigt `RECAPTCHA_SECRET_KEY`  
**Empfehlung:** In Produktion aktivieren zum Schutz vor Bots

---

## Geänderte Einstellungen (Migration von SendGrid)

### **ENTFERNT:** `SENDGRID_API_KEY`
**Ersetzt durch:** `MAILGUN_API_KEY`

### **ENTFERNT:** `SENDGRID_FROM_EMAIL`
**Ersetzt durch:** `MAILGUN_FROM_EMAIL`

### **ENTFERNT:** `EMAIL_PROVIDER`
**Änderung:** Fest auf `mailgun` gesetzt, nicht mehr konfigurierbar

### **NEU:** `MAILGUN_DOMAIN`
**Beschreibung:** Neue erforderliche Einstellung für Mailgun-Domain

### **NEU:** `MAILGUN_FROM_NAME`
**Beschreibung:** Neue optionale Einstellung für Absender-Anzeigenamen

---

## Produktions-Checkliste

Vor der Aktivierung in Produktion:

- [ ] `MAILGUN_API_KEY`, `MAILGUN_DOMAIN`, `MAILGUN_FROM_EMAIL` konfiguriert
- [ ] `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_SMS_FROM` konfiguriert
- [ ] `NOTIFY_TOKEN_SECRET` mit starkem Zufallswert generiert (mindestens 32 Zeichen)
- [ ] `DB_ENCRYPT=true` und `DB_TRUST_SERVER_CERTIFICATE=false` gesetzt
- [ ] Rate-Limiting-Werte für Produktionsverkehr angepasst
- [ ] `FEATURE_RECAPTCHA_VALIDATION=true` und `RECAPTCHA_SECRET_KEY` konfiguriert
- [ ] Alle Secrets in sicherer Umgebung gespeichert (Azure Key Vault, etc.)
- [ ] Mailgun-Domain verifiziert und DNS-Einträge gesetzt
- [ ] Twilio-Telefonnummer registriert und verifiziert
- [ ] Test-Benachrichtigung erfolgreich versendet (E-Mail + SMS)

---

## Migrations-Hinweise

### Von SendGrid zu Mailgun

1. **Dependencies aktualisieren:**
   ```bash
   npm uninstall @sendgrid/mail
   npm install mailgun.js form-data
   ```

2. **Umgebungsvariablen aktualisieren:**
   - `SENDGRID_API_KEY` → `MAILGUN_API_KEY`
   - `SENDGRID_FROM_EMAIL` → `MAILGUN_FROM_EMAIL`
   - `MAILGUN_DOMAIN` hinzufügen (neu erforderlich)

3. **Domain in Mailgun konfigurieren:**
   - Mailgun Dashboard > Sending > Domains
   - Domain hinzufügen und DNS-Einträge setzen
   - Domain-Verifizierung abwarten

4. **API-Key erstellen:**
   - Mailgun Dashboard > Settings > API Keys
   - Neuen API-Key mit Versandrechten erstellen

### Keine Code-Änderungen erforderlich

Alle Änderungen sind in der zentralisierten Konfiguration gekapselt. Die Anwendung verwendet automatisch Mailgun, sobald die Umgebungsvariablen gesetzt sind.

---

## Support und Dokumentation

- **Vollständige Dokumentation:** Siehe `CONFIG.md`
- **Beispiel-Konfiguration:** Siehe `.env.local.example`
- **Implementierung:** Siehe `lib/config.ts`

---

## Änderungen an bestehenden Dateien

### `lib/TagRepo.ts`
- Verwendet jetzt zentralisierte Datenbankkonfiguration
- Entfernt direkte `process.env`-Zugriffe

### `lib/notifySecurity.ts`
- Verwendet jetzt zentralisierte Sicherheitskonfiguration
- Token-TTL aus Konfiguration statt hardcodiert

### `app/api/notify/route.ts`
- Vollständig refactored zur Nutzung zentralisierter Konfiguration
- Ersetzt SendGrid durch Mailgun
- Entfernt alle Magic Numbers (Rate-Limits, Timeouts, etc.)
- Feature-Flags für modulare Funktionssteuerung
- Verbesserte Typsicherheit

### `.env.local.example`
- Aktualisiert mit Mailgun-Variablen
- Dokumentiert alle neuen Einstellungen

---

## Keine Linter-Probleme

Alle Änderungen wurden auf TypeScript-Kompatibilität getestet. Die einzigen verbleibenden TypeScript-Fehler stammen aus:
- Bestehenden Dateien (nicht Teil dieses PRs)
- Node Modules (Twilio/Next.js Type-Definitionen)
- Veralteten `tsconfig.json`-Einstellungen

Die **neu hinzugefügten und geänderten Dateien** kompilieren fehlerfrei.
