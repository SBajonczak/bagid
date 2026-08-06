import { ITagRepo } from './db/ITagRepo';
import { MssqlTagRepo } from './db/MssqlTagRepo';
import { TursoTagRepo } from './db/TursoTagRepo';
import { FlightLeg } from './types';
import { getConfig } from './config';

export class TagRepo {
  private repo: ITagRepo;

  constructor() {
    const config = getConfig();
    if (config.database.provider === 'turso') {
      this.repo = new TursoTagRepo();
    } else {
      this.repo = new MssqlTagRepo();
    }
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
        "transportationDate": "2026-05-18T09:45:00Z",
        "showFlightMap": true,
        "destinationLat": 41.9028,
        "destinationLon": 12.4964
      };
    }

    return this.repo.getTravelDataByTagId(tagId);
  }

  /**
   * Aktualisiert die Reisedaten für die angegebene Tag-ID
   * @param tagId - Die NFC-Tag-ID
   * @param updateData - Die zu aktualisierenden Daten
   * @returns Wahr, wenn die Aktualisierung erfolgreich war
   */
  async updateTravelDataByTagId(tagId: string, updateData: Record<string, unknown>): Promise<boolean> {
    return this.repo.updateTravelDataByTagId(tagId, updateData);
  }

  /**
   * Registriert einen Besitzer für einen Tag
   * @param tagId - Die NFC-Tag-ID
   * @param userId - Die Benutzer-ID aus Azure B2C
   * @param userEmail - Die E-Mail-Adresse des Benutzers
   * @returns Wahr, wenn die Registrierung erfolgreich war
   */
  async registerTagOwner(tagId: string, userId: string, userEmail: string): Promise<boolean> {
    return this.repo.registerTagOwner(tagId, userId, userEmail);
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
    return this.repo.verifyTagOwner(tagId, userId);
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
    return this.repo.tagExists(tagId);
  }

  async tagRegistered(tagId: string): Promise<boolean> {
    return this.repo.tagRegistered(tagId);
  }

  /**
   * Ruft die Tags für einen bestimmten Benutzer ab
   * @param userId - Die Benutzer-ID aus Azure B2C
   * @returns Liste der Tags des Benutzers
   */
  async getUserTags(userId: string): Promise<unknown[]> {
    return this.repo.getUserTags(userId);
  }

  async getFlightLegs(tagId: string): Promise<FlightLeg[]> {
    if (tagId === 'demo') {
      const now = new Date();
      const d = (offsetDays: number) => {
        const d = new Date(now);
        d.setDate(d.getDate() + offsetDays);
        return d.toISOString();
      };
      return [
        { journeyType: 'outbound', sequence: 1, carrier: 'Lufthansa', flightNumber: 'LH 400', departureAirport: 'FRA', departureDatetime: d(-1), arrivalAirport: 'JFK', arrivalDatetime: d(0), departureLat: 50.0333, departureLon: 8.5706, departureAirportName: 'Frankfurt Airport', arrivalLat: 40.6413, arrivalLon: -73.7781, arrivalAirportName: 'John F. Kennedy International Airport' },
        { journeyType: 'outbound', sequence: 2, carrier: 'United', flightNumber: 'UA 500', departureAirport: 'JFK', departureDatetime: d(0), arrivalAirport: 'LAX', arrivalDatetime: d(1), departureLat: 40.6413, departureLon: -73.7781, departureAirportName: 'John F. Kennedy International Airport', arrivalLat: 33.9425, arrivalLon: -118.4081, arrivalAirportName: 'Los Angeles International Airport' },
        { journeyType: 'return', sequence: 1, carrier: 'Lufthansa', flightNumber: 'LH 401', departureAirport: 'LAX', departureDatetime: d(14), arrivalAirport: 'FRA', arrivalDatetime: d(15), departureLat: 33.9425, departureLon: -118.4081, departureAirportName: 'Los Angeles International Airport', arrivalLat: 50.0333, arrivalLon: 8.5706, arrivalAirportName: 'Frankfurt Airport' },
      ];
    }
    return this.repo.getFlightLegs(tagId);
  }

  async setFlightLegs(tagId: string, legs: FlightLeg[]): Promise<boolean> {
    return this.repo.setFlightLegs(tagId, legs);
  }
}
