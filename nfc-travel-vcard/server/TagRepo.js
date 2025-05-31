import sql from 'mssql';

// Datenbankkonfiguration
const dbConfig = {

  user: 'sbaadmin',      // Ersetze mit deinem DB-Benutzernamen
  password: '=S?p86`YCYjo*7TNc~[S', // Ersetze mit deinem DB-Passwort
  server: 'sbadbprod.database.windows.net',       // Ersetze mit deinem DB-Server
  database: 'nfc', // Ersetze mit deinem Datenbanknamen
  options: {
    encrypt: true,
    trustServerCertificate: true // Nur für Entwicklungsumgebungen
  }
};

export class TagRepo {
  constructor() {
    this.pool = null;
  }

  // Verbindung zur Datenbank herstellen oder wiederverwenden
  async getConnection() {
    if (this.pool) {
      return this.pool;
    }
    
    try {
      this.pool = await sql.connect(dbConfig);
      return this.pool;
    } catch (err) {
      console.error('Datenbankverbindungsfehler:', err);
      throw new Error('Fehler bei der Verbindung zur Datenbank');
    }
  }

  // Reisedaten anhand der Tag-ID abrufen
  async getTravelDataByTagId(tagId) {
    try {
      // Wenn es sich um die Demo-ID handelt, Demo-Daten zurückgeben
      if (tagId === 'demo') {
        return this.getDemoData(tagId);
      }

      const pool = await this.getConnection();
      
      // SQL-Abfrage, um die Reisedaten zu erhalten
      // Passe die Tabellen- und Spaltennamen entsprechend deiner Datenbankstruktur an
    const result = await pool.request()
      .input('tagId', sql.UniqueIdentifier, tagId)
      .query(`
        SELECT 
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
        FROM 
        TravelTag
        WHERE 
        tagId = @tagId
      `);

      // Wenn keine Daten gefunden wurden
      if (result.recordset.length === 0) {
        return null;
      }

      return result.recordset[0];
    } catch (err) {
      console.error('Fehler beim Abrufen der Reisedaten:', err);
      throw err;
    }
  }

  // Demo-Daten für Testzwecke
  getDemoData(tagId) {
    return {
      tagId: tagId,
      hasData: true,
      ownerFirstName: 'John',
      ownerLastName: 'Doe',
      ownerAddress: '123 Main St, Berlin',
      ownerEmail: 'john.doe@example.com',
      ownerMobile: '+49 123 456789',
      ownerLandline: '+49 30 123456',
      ownerOther: 'N/A',
      transportation: 'Lufthansa',
      transportationNumber: 'LH1234',
      transportationDate: new Date(),
      guideFirstName: 'Anna',
      guideLastName: 'Schmidt',
      guideEmail: 'anna.schmidt@example.com',
      guideMobile: '+49 176 987654',
      guideLandline: '+49 30 654321',
      destinationAccommodation: 'Hotel Berlin',
      destinationAddress: 'Alexanderplatz 1, 10178 Berlin'
    };
  }
}
