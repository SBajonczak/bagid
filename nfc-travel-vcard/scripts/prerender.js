import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '..', 'dist');
const indexHtmlPath = path.join(distPath, 'index.html');

// Read the built index.html
let html = fs.readFileSync(indexHtmlPath, 'utf-8');

// SEO-optimized content that will be injected into the HTML
const seoContent = `
    <!-- SEO Content Start -->
    <div id="seo-content" style="display:none;">
      <main>
        <h1>Bag-Tag.de - Smarte NFC Gepäckanhänger für sicheres Reisen</h1>
        <article>
          <h2>Nie wieder den Koffer verlieren mit dem smarten Travel Tag</h2>
          <p>Der Bag-Tag ist ein innovativer NFC Gepäckanhänger, der Ihnen hilft, Ihr verlorenes Gepäck schnell wiederzufinden. Mit modernster kontaktloser NFC-Technologie und QR-Code-Integration bietet unser Travel Tag maximale Sicherheit für Ihre Koffer und Taschen.</p>
          
          <h3>Ihre Vorteile mit dem Bag-Tag NFC Gepäckanhänger:</h3>
          <ul>
            <li>NFC-Technologie: Kontaktloses Auslesen mit jedem Smartphone</li>
            <li>Aktualisierbare Daten: Ihre Kontaktinformationen jederzeit änderbar</li>
            <li>Reise-optimiert: Perfekt für Koffer, Rucksäcke und Handgepäck</li>
            <li>Schneller Versand: Kostenloser Versand ab 2 Stück</li>
            <li>Datenschutz: Ihre Daten bleiben privat und sicher</li>
            <li>Einfache Nutzung: Keine App erforderlich</li>
            <li>Weltweit einsetzbar: Funktioniert überall</li>
          </ul>
          
          <h3>Warum ein NFC Gepäckanhänger?</h3>
          <p>Verlorenes Gepäck ist ein häufiges Problem beim Reisen. Mit einem Bag-Tag NFC Kofferanhänger können Finder Ihr Gepäck einfach durch Antippen mit dem Smartphone identifizieren und Sie kontaktieren. Im Gegensatz zu herkömmlichen Gepäckanhängern sind Ihre persönlichen Daten nicht öffentlich sichtbar, sondern nur für den Finder zugänglich, wenn er den Tag scannt.</p>
          
          <p>Der digitale Gepäckanhänger ist wasserfest, robust und speziell für den Einsatz auf Reisen entwickelt. Ob Koffer, Rucksack oder Handgepäck - der Bag-Tag ist Ihr zuverlässiger Reisebegleiter für alle Reisen weltweit.</p>
          
          <h3>So funktioniert der Bag-Tag:</h3>
          <ol>
            <li>Registrieren: Erstellen Sie Ihr kostenloses Bag-Tag Konto</li>
            <li>Aktivieren: Aktivieren Sie Ihren NFC Tag mit der eindeutigen ID</li>
            <li>Personalisieren: Hinterlegen Sie Ihre Kontaktdaten</li>
            <li>Befestigen: Bringen Sie den Tag an Ihrem Gepäck an</li>
            <li>Reisen: Genießen Sie sorgenfreies Reisen mit zusätzlicher Sicherheit</li>
          </ol>
          
          <h3>Jetzt kaufen - Nur 12,99 € pro Stück</h3>
          <p>Sichern Sie sich jetzt Ihren Bag-Tag NFC Gepäckanhänger. Kostenloser Versand ab 2 Stück. Perfekt als Geschenk für Vielflieger, Urlauber und Geschäftsreisende. Der smarte Kofferanhänger mit NFC und QR-Code für maximale Sicherheit auf Reisen.</p>
          
          <h3>Häufig gestellte Fragen (FAQ)</h3>
          <p>Wie funktioniert ein NFC Gepäckanhänger? Der NFC Tag wird einfach am Koffer befestigt. Finder können mit ihrem Smartphone den Tag scannen und erhalten Ihre Kontaktdaten, um das Gepäck zurückzugeben.</p>
          
          <p>Ist der Bag-Tag wasserfest? Ja, der Bag-Tag ist wasserfest und für alle Wetterbedingungen geeignet. Er ist robust und hält den Strapazen des Reisens stand.</p>
          
          <p>Brauche ich eine App? Nein, der Bag-Tag funktioniert ohne App. Jedes moderne Smartphone mit NFC kann den Tag auslesen.</p>
          
          <p>Kann ich meine Daten ändern? Ja, Sie können Ihre Kontaktdaten jederzeit in Ihrem Bag-Tag Konto aktualisieren. Die Änderungen sind sofort aktiv.</p>
          
          <p>Funktioniert der Tag weltweit? Ja, der Bag-Tag funktioniert weltweit. NFC ist ein internationaler Standard, der überall funktioniert.</p>
        </article>
      </main>
    </div>
    <!-- SEO Content End -->
`;

// Inject the SEO content right after the opening <body> tag
html = html.replace('<body>', `<body>${seoContent}`);

// Write the modified HTML back
fs.writeFileSync(indexHtmlPath, html, 'utf-8');

console.log('✅ Prerendering complete: SEO content injected into index.html');
