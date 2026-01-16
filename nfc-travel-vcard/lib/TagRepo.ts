import { Logger } from 'concurrently';
import sql from 'mssql';
import dotenv from 'dotenv';
import { getConfig } from './config';

dotenv.config();

export class TagRepo {
  private config: sql.config;

  constructor() {
    const appConfig = getConfig();
    this.config = {
      user: appConfig.database.user,
      password: appConfig.database.password,
      server: appConfig.database.server,
      database: appConfig.database.database,
      options: {
        encrypt: appConfig.database.encrypt,
        trustServerCertificate: appConfig.database.trustServerCertificate
      }
    };
  }

  /**
   * Stellt eine Verbindung zur Datenbank her
   * @returns {Promise<sql.ConnectionPool>} Datenbankverbindung
   */
  async getConnection() {
    try {
      console.log('Versuche, eine Verbindung zur Datenbank herzustellen...');
      console.log('Datenbankkonfiguration:', this.config.server, this.config.database);
      const pool = await sql.connect(this.config);
      console.log('Datenbank erfolgreich verbunden');
      return pool;
    } catch (err) {
      console.error('Datenbankverbindungsfehler:', err);
      throw new Error('Fehler bei der Verbindung zur Datenbank');
    }
  }

  /**
   * Ruft die Reisedaten für die angegebene Tag-ID ab
   * @param {string} tagId - Die NFC-Tag-ID
   * @returns {Promise<object|null>} Reisedaten oder null, wenn nicht gefunden
   */
  async getTravelDataByTagId(tagId: string) {
    try {
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
        }
      }

      const pool = await this.getConnection();

      // Abfrage zum Abrufen der Reisedaten nach Tag-ID, angepasst an das TravelData Interface
      const result = await pool.request()
        .input('tagId', sql.UniqueIdentifier, tagId)
        .query(`
          SELECT 
            TagID as tagId,
            CASE WHEN 1=1 THEN 1 ELSE 0 END as hasData,
            tagName as tagName,
            OwnerFirstName as ownerFirstName,
            OwnerLastName as ownerLastName,
            OwnerAddress as ownerAddress,
            OwnerEmail as ownerEmail,
            OwnerMobile as ownerMobile,
            OwnerLandline as ownerLandline,
            OwnerOther as ownerOther,
            GuideFirstName as guideFirstName,
            GuideLastName as guideLastName,
            GuideEmail as guideEmail,
            GuideMobile as guideMobile,
            GuideLandline as guideLandline,
            DestinationAccommodation as destinationAccommodation,
            DestinationAddress as destinationAddress,
            Transportation as transportation,
            TransportationNumber as transportationNumber,
            TransportationDate as transportationDate
          FROM TravelTag
          WHERE TagID = @tagId and isRegistered=1
        `);

      // Verbindung schließen
      await pool.close();

      if (result.recordset.length === 0) {
        return null;
      }

      // Format the data according to the TravelData interface
      const travelData = result.recordset[0];
      travelData.hasData = true;

      return travelData;
    } catch (error) {
      console.error('Fehler beim Abrufen der Reisedaten:', error);
      throw error;
    }
  }

  /**
   * Aktualisiert die Reisedaten für die angegebene Tag-ID
   * @param {string} tagId - Die NFC-Tag-ID
   * @param {object} updateData - Die zu aktualisierenden Daten
   * @returns {Promise<boolean>} Wahr, wenn die Aktualisierung erfolgreich war
   */
  async updateTravelDataByTagId(tagId, updateData) {
    try {
      const pool = await this.getConnection();

      // Prüfen, ob der Datensatz existiert
      const checkResult = await pool.request()
        .input('tagId', sql.UniqueIdentifier, tagId)
        .query('SELECT 1 FROM TravelTag WHERE TagID = @tagId');

      const request = pool.request().input('tagId', sql.UniqueIdentifier, tagId);

      // Wenn der Datensatz nicht existiert, erstellen wir einen neuen
      if (checkResult.recordset.length === 0) {
        // SQL-Felder und Werte für die Einfügung vorbereiten
        const fields = ['TagID'];
        const values = ['@tagId'];

        // Mapping der TravelData-Properties zu Datenbankspalten
        const fieldMappings = {
          tagName: { sqlField: 'tagName', sqlType: sql.NVarChar },
          ownerFirstName: { sqlField: 'OwnerFirstName', sqlType: sql.NVarChar },
          ownerLastName: { sqlField: 'OwnerLastName', sqlType: sql.NVarChar },
          ownerAddress: { sqlField: 'OwnerAddress', sqlType: sql.NVarChar },
          ownerEmail: { sqlField: 'OwnerEmail', sqlType: sql.NVarChar },
          ownerMobile: { sqlField: 'OwnerMobile', sqlType: sql.NVarChar },
          ownerLandline: { sqlField: 'OwnerLandline', sqlType: sql.NVarChar },
          ownerOther: { sqlField: 'OwnerOther', sqlType: sql.NVarChar },
          guideFirstName: { sqlField: 'GuideFirstName', sqlType: sql.NVarChar },
          guideLastName: { sqlField: 'GuideLastName', sqlType: sql.NVarChar },
          guideEmail: { sqlField: 'GuideEmail', sqlType: sql.NVarChar },
          guideMobile: { sqlField: 'GuideMobile', sqlType: sql.NVarChar },
          guideLandline: { sqlField: 'GuideLandline', sqlType: sql.NVarChar },
          destinationAccommodation: { sqlField: 'DestinationAccommodation', sqlType: sql.NVarChar },
          destinationAddress: { sqlField: 'DestinationAddress', sqlType: sql.NVarChar },
          transportation: { sqlField: 'Transportation', sqlType: sql.NVarChar },
          transportationNumber: { sqlField: 'TransportationNumber', sqlType: sql.NVarChar },
          transportationDate: { sqlField: 'TransportationDate', sqlType: sql.DateTime },
        };

        // Für jedes Feld im updateData-Objekt
        Object.keys(updateData).forEach(key => {
          const mapping = fieldMappings[key];
          if (mapping && updateData[key] !== undefined) {
            fields.push(mapping.sqlField);
            values.push(`@${key}`);

            const value = key === 'transportationDate' && updateData[key]
              ? new Date(updateData[key])
              : updateData[key];
            request.input(key, mapping.sqlType, value);
          }
        });

        // Zeitstempelfelder hinzufügen
        const now = new Date();

        // Insert-Abfrage ausführen
        const insertQuery = `
          INSERT INTO TravelTag (${fields.join(', ')})
          VALUES (${values.join(', ')})
        `;

        await request.query(insertQuery);
      } else {
        // Aktualisierung eines vorhandenen Datensatzes
        // SET-Klausel der UPDATE-Anweisung dynamisch erstellen
        const updateColumns = [];

        // Mapping der TravelData-Properties zu Datenbankspalten
        const fieldMappings = {
          tagName: { sqlField: 'tagName', sqlType: sql.NVarChar },
          ownerFirstName: { sqlField: 'OwnerFirstName', sqlType: sql.NVarChar },
          ownerLastName: { sqlField: 'OwnerLastName', sqlType: sql.NVarChar },
          ownerAddress: { sqlField: 'OwnerAddress', sqlType: sql.NVarChar },
          ownerEmail: { sqlField: 'OwnerEmail', sqlType: sql.NVarChar },
          ownerMobile: { sqlField: 'OwnerMobile', sqlType: sql.NVarChar },
          ownerLandline: { sqlField: 'OwnerLandline', sqlType: sql.NVarChar },
          ownerOther: { sqlField: 'OwnerOther', sqlType: sql.NVarChar },
          guideFirstName: { sqlField: 'GuideFirstName', sqlType: sql.NVarChar },
          guideLastName: { sqlField: 'GuideLastName', sqlType: sql.NVarChar },
          guideEmail: { sqlField: 'GuideEmail', sqlType: sql.NVarChar },
          guideMobile: { sqlField: 'GuideMobile', sqlType: sql.NVarChar },
          guideLandline: { sqlField: 'GuideLandline', sqlType: sql.NVarChar },
          destinationAccommodation: { sqlField: 'DestinationAccommodation', sqlType: sql.NVarChar },
          destinationAddress: { sqlField: 'DestinationAddress', sqlType: sql.NVarChar },
          transportation: { sqlField: 'Transportation', sqlType: sql.NVarChar },
          transportationNumber: { sqlField: 'TransportationNumber', sqlType: sql.NVarChar },
          transportationDate: { sqlField: 'TransportationDate', sqlType: sql.DateTime },
        };

        // Für jedes Feld im updateData-Objekt
        Object.keys(updateData).forEach(key => {
          const mapping = fieldMappings[key];
          if (mapping && updateData[key] !== undefined) {
            updateColumns.push(`${mapping.sqlField} = @${key}`);

            const value = key === 'transportationDate' && updateData[key]
              ? new Date(updateData[key])
              : updateData[key];
            request.input(key, mapping.sqlType, value);
          }
        });

        // Immer den LastUpdated-Zeitstempel aktualisieren

        // Wenn keine Spalten zu aktualisieren sind, true zurückgeben (keine Änderungen erforderlich)
        if (updateColumns.length === 0) {
          await pool.close();
          return true;
        }

        // Update-Abfrage ausführen
        const updateQuery = `
          UPDATE TravelTag
          SET ${updateColumns.join(', ')}
          WHERE TagID = @tagId
        `;

        await request.query(updateQuery);
      }

      await pool.close();
      return true;
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Reisedaten:', error);
      throw error;
    }
  }

  /**
   * Registriert einen Besitzer für einen Tag
   * @param {string} tagId - Die NFC-Tag-ID
   * @param {string} userId - Die Benutzer-ID aus Azure B2C
   * @param {string} userEmail - Die E-Mail-Adresse des Benutzers
   * @returns {Promise<boolean>} Wahr, wenn die Registrierung erfolgreich war
   */
  async registerTagOwner(tagId, userId, userEmail) {
    try {
      const pool = await this.getConnection();

      // Überprüfen, ob der Tag bereits einem anderen Benutzer gehört
      const checkResult = await pool.request()
        .input('tagId', sql.UniqueIdentifier, tagId)
        .query(`
          SELECT UserID 
          FROM TagOwners 
          WHERE TagID = @tagId and userid <>'${userId}'
        `);

      if (checkResult.recordset.length > 0) {
        console.log('Tag ist bereits registriert für einen anderen Benutzer:', checkResult.recordset[0].UserID);
        // Tag ist bereits registriert
        await pool.close();
        return false;
      }

      // Tag-Eigentümer registrieren
      await pool.request()
        .input('tagId', sql.UniqueIdentifier, tagId)
        .input('userId', sql.NVarChar, userId)
        .input('userEmail', sql.NVarChar, userEmail)
        .input('registeredAt', sql.DateTime, new Date())
        .query(`
          MERGE TagOwners AS target
          USING (SELECT @tagId AS TagID, @userId AS UserID) AS source
          ON (target.TagID = source.TagID AND target.UserID = source.UserID)
          WHEN MATCHED THEN
        UPDATE SET UserEmail = @userEmail, RegisteredAt = @registeredAt
          WHEN NOT MATCHED THEN
        INSERT (TagID, UserID, UserEmail, RegisteredAt)
        VALUES (@tagId, @userId, @userEmail, @registeredAt);
        `);

      // Setze das Feld isRegistered=1 für die entsprechende TagID in der TravelTag-Tabelle
      await pool.request()
        .input('tagId', sql.UniqueIdentifier, tagId)
        .query(`
          UPDATE TravelTag
          SET isRegistered = 1
          WHERE TagID = @tagId
        `);

      await pool.close();
      return true;
    } catch (error) {
      console.error('Fehler bei der Registrierung des Tag-Eigentümers:', error);
      throw error;
    }
  }

  /**
   * Überprüft, ob ein Benutzer der Eigentümer eines Tags ist
   * @param {string} tagId - Die NFC-Tag-ID
   * @param {string} userId - Die Benutzer-ID aus Azure B2C
   * @returns {Promise<boolean>} Wahr, wenn der Benutzer der Eigentümer ist
   */
  async verifyTagOwner(tagId, userId) {
    if (tagId === "demotag") {
      return false;
    }
    try {
      const pool = await this.getConnection();

      const result = await pool.request()
        .input('tagId', sql.UniqueIdentifier, tagId)
        .input('userId', sql.NVarChar, userId)
        .query(`
          SELECT 1 
          FROM TagOwners 
          WHERE TagID = @tagId AND UserID = @userId
        `);

      pool.close();
      return result.recordset.length > 0;
    } catch (error) {
      console.error('Fehler bei der Überprüfung des Tag-Eigentümers:', error);
      throw error;
    }
  }

  /**
   * Überprüft, ob ein Tag in der Datenbank existiert und erstellt ihn falls nicht vorhanden
   * @param {string} tagId - Die NFC-Tag-ID
   * @returns {Promise<boolean>} Wahr, wenn der Tag existiert (oder erstellt wurde)
   */
  async tagExists(tagId) {
    if (tagId === "demotag") {
      return true;
    }

    try {
      const pool = await this.getConnection();

      const result = await pool.request()
        .input('tagId', sql.UniqueIdentifier, tagId)
        .query(`
          SELECT 1
          FROM TravelTag
          WHERE TagID = @tagId and isRegistered=0
        `);

      // Wenn Tag nicht existiert, erstelle ihn mit Standard-Werten
      if (result.recordset.length === 0) {
        await pool.request()
          .input('tagId', sql.UniqueIdentifier, tagId)
          .query(`
            INSERT INTO TravelTag (
              tagId,
              hasData,
              ownerFirstName,
              ownerLastName,
              ownerAddress,
              ownerEmail,
              ownerMobile,
              ownerLandline,
              ownerOther,
              guideFirstName,
              guideLastName,
              guideEmail,
              guideMobile,
              guideLandline,
              destinationAccommodation,
              destinationAddress,
              transportation,
              transportationNumber,
              transportationDate
            ) VALUES (
              @tagId,
              0,
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              '',
              ''
            )
          `);
        console.log('Neuer Tag erstellt mit ID:', tagId);
      }

      pool.close();
      return true; // Tag existiert jetzt auf jeden Fall
    } catch (error) {
      console.error('Fehler bei der Überprüfung/Erstellung des Tags:', error);
      throw error;
    }
  }

  async tagRegistered(tagId) {
    try {
      const pool = await this.getConnection();

      const result = await pool.request()
        .input('tagId', sql.UniqueIdentifier, tagId)
        .query(`
          SELECT 1
          FROM TravelTag
          WHERE TagID = @tagId and isRegistered=1
        `);
      pool.close();
      return result.recordset.length > 0;
    } catch (error) {
      console.error('Fehler bei der Überprüfung, ob ein Tag existiert:', error);
      throw error;
    }
  }

  /**
   * Ruft die Tags für einen bestimmten Benutzer ab
   * @param {string} userId - Die Benutzer-ID aus Azure B2C
   * @returns {Promise<Array<object>>} Liste der Tags des Benutzers
   */
  async getUserTags(userId) {
    try {
      const pool = await this.getConnection();
      const result = await pool.request()
        .input('userId', sql.NVarChar, userId)
        .query(`
          SELECT t.tagId, t.tagName, t.ownerFirstName, t.ownerLastName, t.hasData
          FROM TravelTag t
          JOIN TagOwners o ON t.tagId = o.TagID
          WHERE o.UserID = @userId
          ORDER BY t.tagName
        `);

      return result.recordset;
    } catch (error) {
      console.error('Fehler beim Abrufen der Tags des Benutzers:', error);
      throw error;
    }
  }

}
