{%- comment -%}
    Shopify Theme Section: Start Page Control
    This template is inspired by the React component in StartPageControl.tsx.
    Place this file in your theme's "sections" directory as "start-page-control.liquid".
{%- endcomment -%}

<section style="width: 100%; background: linear-gradient(to bottom right, #f3f4f6, #e5e7eb); padding: 48px 16px; display: flex; flex-direction: column; align-items: center;">
    <div style="width: 100%; max-width: 1120px; background: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); display: flex; flex-direction: row; padding: 24px; gap: 32px;">
        <!-- Produktbild-Bereich -->
        <div style="flex: 1; display: flex; justify-content: center; align-items: center; flex-direction: column;">
            <h1 style="font-size: 32px; font-weight: 800; color: #1e3a8a; margin-bottom: 16px; text-align: center; display: flex; align-items: center; gap: 16px;">
                <img
                    src="{{ 'tag.png' | asset_url }}"
                    alt="Bag Tag Logo"
                    style="width: 64px;"
                    loading="lazy"
                />
                Bag Tag
            </h1>
            <img
                src="{{ 'productimage.webp' | asset_url }}"
                alt="Bag Tag Produktbild"
                style="width: 100%; max-width: 256px; height: auto; object-fit: contain; border-radius: 8px; min-height: 128px;"
            />
        </div>

        <!-- Textbereich -->
        <div style="flex: 2; display: flex; flex-direction: column; justify-content: center;">
            <p style="font-size: 18px; color: #4b5563; margin-bottom: 24px; text-align: left;">
                Mit NFC & QR-Code. Aktualisiere deine Kontakt- und Reisedaten jederzeit online. Finder können dich sofort kontaktieren oder dein Gepäck weiterleiten.
            </p>
            <ul id="features" style="margin-bottom: 24px; list-style: none; padding: 0; font-size: 16px; color: #374151;">
                <li style="display: flex; align-items: center; gap: 8px;">
                    <span style="display: inline-block; width: 24px; height: 24px; color: #1e3a8a;">📱</span>
                    Sofortiger Zugriff über NFC & QR-Code
                </li>
                <li style="display: flex; align-items: center; gap: 8px;">
                    <span style="display: inline-block; width: 24px; height: 24px; color: #1e3a8a;">🔄</span>
                    Daten jederzeit online aktualisieren
                </li>
                <li style="display: flex; align-items: center; gap: 8px;">
                    <span style="display: inline-block; width: 24px; height: 24px; color: #1e3a8a;">✈️</span>
                    Perfekt für Vielreisende & Familien
                </li>
                <li style="display: flex; align-items: center; gap: 8px;">
                    <span style="display: inline-block; width: 24px; height: 24px; color: #1e3a8a;">📦</span>
                    Gepäck kann weitergeleitet werden
                </li>
                <li style="display: flex; align-items: center; gap: 8px;">
                    <span style="display: inline-block; width: 24px; height: 24px; color: #1e3a8a;">🔒</span>
                    Keine App erforderlich – funktioniert mit jedem Smartphone
                </li>
                <li style="display: flex; align-items: center; gap: 8px;">
                    <span style="display: inline-block; width: 24px; height: 24px; color: #1e3a8a;">💧</span>
                    Schützt deine Privatsphäre – teile nur notwendige Daten
                </li>
                <li style="display: flex; align-items: center; gap: 8px;">
                    <span style="display: inline-block; width: 24px; height: 24px; color: #1e3a8a;">🌍</span>
                    Robustes und wasserdichtes Design für jede Reise
                </li>
            </ul>
            <!-- Preisänderung -->
            <div style="display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 24px;">
                <div style="display: flex; align-items: baseline; gap: 12px;">
                    <span style="color: #9ca3af; text-decoration: line-through; font-size: 18px;">12,99&nbsp;€</span>
                    <span style="font-size: 24px; font-weight: 700; color: #10b981;">10,99&nbsp;€</span>
                    <span style="background: #d1fae5; color: #047857; font-size: 12px; font-weight: 600; padding: 4px 8px; border-radius: 4px;">
                        -15%
                    </span>
                </div>
            </div>
            <!-- CTA -->
            <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
                <!-- Haupt-CTA -->
                <a
                    href="https://kreativschicht.de/products/nfc-kofferanhaenger-3er-set"
                    target="_blank"
                    rel="noopener noreferrer"
                    style="background: #10b981; color: #ffffff; font-weight: 700; padding: 12px 32px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center; text-decoration: none; transition: background 0.3s;"
                    onmouseover="this.style.background='#059669';"
                    onmouseout="this.style.background='#10b981';"
                >
                    Jetzt Bag Tag bestellen
                </a>
                <!-- Sekundäre CTA -->
                <a
                    href="/demo"
                    style="background: #3b82f6; color: #ffffff; font-weight: 600; padding: 8px 24px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center; text-decoration: none; margin-top: 16px; transition: background 0.3s;"
                    onmouseover="this.style.background='#2563eb';"
                    onmouseout="this.style.background='#3b82f6';"
                >
                    Demo ansehen
                </a>
            </div>
        </div>
    </div>

    <!-- Testimonial-Bereich -->
    <div style="width: 100%; max-width: 1120px; margin-top: 48px; text-align: center;">
        <h2 style="font-size: 24px; font-weight: 700; color: #1e3a8a; margin-bottom: 16px;">Was unsere Kunden sagen</h2>
        <p style="font-size: 16px; color: #4b5563;">"Bag Tag hat meine Reise gerettet! Ich habe mein Gepäck verloren, aber dank des NFC-Tags wurde es mir innerhalb weniger Stunden zurückgegeben. Sehr empfehlenswert!"</p>
        <p style="font-size: 16px; color: #4b5563; margin-top: 8px;">- John Doe</p>
    </div>
</section>
