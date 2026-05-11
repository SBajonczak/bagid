import type { ITagRepo } from './db/ITagRepo';
import { getConfig } from './config';

export class TagRepo {
  private repoPromise?: Promise<ITagRepo>;

  private getRepo(): Promise<ITagRepo> {
    if (this.repoPromise) {
      return this.repoPromise;
    }

    this.repoPromise = (async () => {
      const config = getConfig();
      if (config.database.provider === 'turso') {
        const { TursoTagRepo } = await import('./db/TursoTagRepo');
        return new TursoTagRepo();
      }

      const { MssqlTagRepo } = await import('./db/MssqlTagRepo');
      return new MssqlTagRepo();
    })();

    return this.repoPromise;
  }

  /**
   * Ruft die Reisedaten für die angegebene Tag-ID ab
   * @param {string} tagId - Die NFC-Tag-ID
   * @returns {Promise<object|null>} Reisedaten oder null, wenn nicht gefunden
   */
  async getTravelDataByTagId(tagId: string) {
    if (tagId === "demo") {
      return {
        "tagId": "demo",
        "hasData": 1,
        "tagName": "Mein Koffer Tag",
        "ownerFirstName": "Max",
        "ownerLastName": "Mustermann",
        "ownerAddress": "Musterstraße 12, 12345 Berlin, Deutschland",
        "ownerEmail": "max.mustermann@example.com",
        "ownerMobile": "+49 171 1234567",
        "ownerLandline": "+49 30 987654",
        "ownerOther": "Emergency contact via WhatsApp",
        "guideFirstName": "Laura",
        "guideLastName": "Schmidt",
        "guideEmail": "laura.schmidt@example.com",
        "guideMobile": "+49 160 7654321",
        "guideLandline": null,
        "destinationAccommodation": "Hotel Bella Vista",
        "destinationAddress": "Via Roma 42, 00100 Rom, Italien",
        "transportation": "Flight",
        "transportationNumber": "LH1234",
        "transportationDate": "2026-05-18T09:45:00Z"
      };
    }

    return (await this.getRepo()).getTravelDataByTagId(tagId);
  }

  /**
   * Aktualisiert die Reisedaten für die angegebene Tag-ID
   * @param tagId - Die NFC-Tag-ID
   * @param updateData - Die zu aktualisierenden Daten
   * @returns Wahr, wenn die Aktualisierung erfolgreich war
   */
  async updateTravelDataByTagId(tagId: string, updateData: Record<string, unknown>): Promise<boolean> {
    return (await this.getRepo()).updateTravelDataByTagId(tagId, updateData);
  }

  /**
   * Registriert einen Besitzer für einen Tag
   * @param tagId - Die NFC-Tag-ID
   * @param userId - Die Benutzer-ID aus Azure B2C
   * @param userEmail - Die E-Mail-Adresse des Benutzers
   * @returns Wahr, wenn die Registrierung erfolgreich war
   */
  async registerTagOwner(tagId: string, userId: string, userEmail: string): Promise<boolean> {
    return (await this.getRepo()).registerTagOwner(tagId, userId, userEmail);
  }

  /**
   * Überprüft, ob ein Benutzer der Eigentümer eines Tags ist
   * @param tagId - Die NFC-Tag-ID
   * @param userId - Die Benutzer-ID aus Azure B2C
   * @returns Wahr, wenn der Benutzer der Eigentümer ist
   */
  async verifyTagOwner(tagId: string, userId: string): Promise<boolean> {
    // Demo-Tag gehört niemandem spezifisch, aber hier sagen wir false, da nicht editierbar
    if (tagId === "demotag") {
      return false;
    }
    return (await this.getRepo()).verifyTagOwner(tagId, userId);
  }

  /**
   * Überprüft, ob ein Tag in der Datenbank existiert und erstellt ihn falls nicht vorhanden
   * @param tagId - Die NFC-Tag-ID
   * @returns Wahr, wenn der Tag existiert (oder erstellt wurde)
   */
  async tagExists(tagId: string): Promise<boolean> {
    if (tagId === "demotag") {
      return true;
    }
    return (await this.getRepo()).tagExists(tagId);
  }

  async tagRegistered(tagId: string): Promise<boolean> {
    return (await this.getRepo()).tagRegistered(tagId);
  }

  /**
   * Ruft die Tags für einen bestimmten Benutzer ab
   * @param userId - Die Benutzer-ID aus Azure B2C
   * @returns Liste der Tags des Benutzers
   */
  async getUserTags(userId: string): Promise<unknown[]> {
    return (await this.getRepo()).getUserTags(userId);
  }
}
