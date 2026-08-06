import sql from 'mssql';
import { ITagRepo } from './ITagRepo';
import { FlightLeg } from '../types';
import { getConfig } from '../config';

export class MssqlTagRepo implements ITagRepo {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private config: any;

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

  private async getPool(): Promise<sql.ConnectionPool> {
    try {
      return await sql.connect(this.config);
    } catch (err) {
      console.error('Datenbankverbindungsfehler:', err);
      throw new Error('Fehler bei der Verbindung zur Datenbank');
    }
  }

  async getTravelDataByTagId(tagId: string): Promise<unknown> {
    try {
      const pool = await this.getPool();

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
            TransportationDate as transportationDate,
            ISNULL(ShowFlightMap, 0) as showFlightMap,
            DestinationLat as destinationLat,
            DestinationLon as destinationLon
          FROM TravelTag
          WHERE TagID = @tagId and isRegistered=1
        `);

      await pool.close();

      if (result.recordset.length === 0) {
        return null;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const travelData: any = result.recordset[0];
      travelData.hasData = true;

      return travelData;
    } catch (error) {
      console.error('Fehler beim Abrufen der Reisedaten:', error);
      throw error;
    }
  }

  async updateTravelDataByTagId(tagId: string, updateData: Record<string, unknown>): Promise<boolean> {
    try {
      const pool = await this.getPool();

      // Prüfen, ob der Datensatz existiert
      const checkResult = await pool.request()
        .input('tagId', sql.UniqueIdentifier, tagId)
        .query('SELECT 1 FROM TravelTag WHERE TagID = @tagId');

      const request = pool.request().input('tagId', sql.UniqueIdentifier, tagId);

      const fieldMappings: Record<string, { sqlField: string; sqlType: sql.ISqlType }> = {
        tagName: { sqlField: 'tagName', sqlType: sql.NVarChar(255) },
        ownerFirstName: { sqlField: 'OwnerFirstName', sqlType: sql.NVarChar(255) },
        ownerLastName: { sqlField: 'OwnerLastName', sqlType: sql.NVarChar(255) },
        ownerAddress: { sqlField: 'OwnerAddress', sqlType: sql.NVarChar(500) },
        ownerEmail: { sqlField: 'OwnerEmail', sqlType: sql.NVarChar(255) },
        ownerMobile: { sqlField: 'OwnerMobile', sqlType: sql.NVarChar(50) },
        ownerLandline: { sqlField: 'OwnerLandline', sqlType: sql.NVarChar(50) },
        ownerOther: { sqlField: 'OwnerOther', sqlType: sql.NVarChar(500) },
        guideFirstName: { sqlField: 'GuideFirstName', sqlType: sql.NVarChar(255) },
        guideLastName: { sqlField: 'GuideLastName', sqlType: sql.NVarChar(255) },
        guideEmail: { sqlField: 'GuideEmail', sqlType: sql.NVarChar(255) },
        guideMobile: { sqlField: 'GuideMobile', sqlType: sql.NVarChar(50) },
        guideLandline: { sqlField: 'GuideLandline', sqlType: sql.NVarChar(50) },
        destinationAccommodation: { sqlField: 'DestinationAccommodation', sqlType: sql.NVarChar(255) },
        destinationAddress: { sqlField: 'DestinationAddress', sqlType: sql.NVarChar(500) },
        transportation: { sqlField: 'Transportation', sqlType: sql.NVarChar(100) },
        transportationNumber: { sqlField: 'TransportationNumber', sqlType: sql.NVarChar(50) },
        transportationDate: { sqlField: 'TransportationDate', sqlType: sql.DateTime() },
        showFlightMap: { sqlField: 'ShowFlightMap', sqlType: sql.Bit() },
        destinationLat: { sqlField: 'DestinationLat', sqlType: sql.Float() },
        destinationLon: { sqlField: 'DestinationLon', sqlType: sql.Float() },
      };

      if (checkResult.recordset.length === 0) {
        // Insert
        const fields = ['TagID'];
        const values = ['@tagId'];

        for (const key in updateData) {
          if (Object.prototype.hasOwnProperty.call(updateData, key)) {
            const mapping = fieldMappings[key];
            const value = updateData[key];

            if (mapping && value !== undefined) {
              fields.push(mapping.sqlField);
              values.push(`@${key}`);

              const finalValue = key === 'transportationDate' && value
                ? new Date(value as string | number)
                : value;
              request.input(key, mapping.sqlType, finalValue);
            }
          }
        }

        const insertQuery = `
          INSERT INTO TravelTag (${fields.join(', ')})
          VALUES (${values.join(', ')})
        `;

        await request.query(insertQuery);
      } else {
        // Update
        const updateColumns: string[] = [];

        Object.keys(updateData).forEach(key => {
          const mapping = fieldMappings[key];
          if (mapping && updateData[key] !== undefined) {
            updateColumns.push(`${mapping.sqlField} = @${key}`);

            const value = key === 'transportationDate' && updateData[key]
              ? new Date(updateData[key] as string | number)
              : updateData[key];
            request.input(key, mapping.sqlType, value);
          }
        });

        if (updateColumns.length === 0) {
          await pool.close();
          return true;
        }

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

  async registerTagOwner(tagId: string, userId: string, userEmail: string): Promise<boolean> {
    try {
      const pool = await this.getPool();

      const checkResult = await pool.request()
        .input('tagId', sql.UniqueIdentifier, tagId)
        .query(`
          SELECT UserID 
          FROM TagOwners 
          WHERE TagID = @tagId and userid <>'${userId}'
        `);

      if (checkResult.recordset.length > 0) {
        console.log('Tag ist bereits registriert für einen anderen Benutzer:', checkResult.recordset[0].UserID);
        await pool.close();
        return false;
      }

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

  async verifyTagOwner(tagId: string, userId: string): Promise<boolean> {
    try {
      const pool = await this.getPool();

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

  async tagExists(tagId: string): Promise<boolean> {
    try {
      const pool = await this.getPool();

      const result = await pool.request()
        .input('tagId', sql.UniqueIdentifier, tagId)
        .query(`
          SELECT 1
          FROM TravelTag
          WHERE TagID = @tagId
        `);

      if (result.recordset.length === 0) {
        await pool.request()
          .input('tagId', sql.UniqueIdentifier, tagId)
          .query(`
            INSERT INTO TravelTag (
              tagId, hasData, ownerFirstName, ownerLastName, ownerAddress, ownerEmail, ownerMobile, ownerLandline, ownerOther,
              guideFirstName, guideLastName, guideEmail, guideMobile, guideLandline, destinationAccommodation, destinationAddress,
              transportation, transportationNumber, transportationDate
            ) VALUES (
              @tagId, 0, '', '', '', '', '', '', '',
              '', '', '', '', '', '', '',
              '', '', ''
            )
          `);
        console.log('Neuer Tag erstellt mit ID:', tagId);
      }

      pool.close();
      return true;
    } catch (error) {
      console.error('Fehler bei der Überprüfung/Erstellung des Tags:', error);
      throw error;
    }
  }

  async tagRegistered(tagId: string): Promise<boolean> {
    try {
      const pool = await this.getPool();
      const result = await pool.request()
        .input('tagId', sql.UniqueIdentifier, tagId)
        .query(`SELECT 1 FROM TravelTag WHERE TagID = @tagId and isRegistered=1`);
      pool.close();
      
      return result.recordset.length > 0;
    } catch (error) {
      console.error('Fehler bei der Überprüfung, ob ein Tag existiert:', error);
      throw error;
    }
  }

  async getFlightLegs(tagId: string): Promise<FlightLeg[]> {
    try {
      const pool = await this.getPool();
      const result = await pool.request()
        .input('tagId', sql.UniqueIdentifier, tagId)
        .query(`
          SELECT ID as id, TagID as tagId, JourneyType as journeyType, Sequence as sequence,
                 Carrier as carrier, FlightNumber as flightNumber,
                 DepartureAirport as departureAirport, DepartureDatetime as departureDatetime,
                 ArrivalAirport as arrivalAirport, ArrivalDatetime as arrivalDatetime,
                 DepartureLat as departureLat, DepartureLon as departureLon,
                 ArrivalLat as arrivalLat, ArrivalLon as arrivalLon,
                 DepartureAirportName as departureAirportName, ArrivalAirportName as arrivalAirportName
          FROM FlightLegs
          WHERE TagID = @tagId
          ORDER BY JourneyType, Sequence
        `);
      await pool.close();
      return result.recordset.map((row: Record<string, unknown>) => ({
        ...row,
        departureDatetime: row.departureDatetime ? new Date(row.departureDatetime as string).toISOString() : '',
        arrivalDatetime: row.arrivalDatetime ? new Date(row.arrivalDatetime as string).toISOString() : '',
      })) as FlightLeg[];
    } catch (error) {
      console.error('Fehler beim Abrufen der Flugreisen:', error);
      throw error;
    }
  }

  async setFlightLegs(tagId: string, legs: FlightLeg[]): Promise<boolean> {
    try {
      const pool = await this.getPool();
      const transaction = new sql.Transaction(pool);
      await transaction.begin();
      try {
        await transaction.request()
          .input('tagId', sql.UniqueIdentifier, tagId)
          .query('DELETE FROM FlightLegs WHERE TagID = @tagId');

        for (const leg of legs) {
          await transaction.request()
            .input('tagId', sql.UniqueIdentifier, tagId)
            .input('journeyType', sql.NVarChar(10), leg.journeyType)
            .input('sequence', sql.Int, leg.sequence)
            .input('carrier', sql.NVarChar(100), leg.carrier || null)
            .input('flightNumber', sql.NVarChar(20), leg.flightNumber || null)
            .input('departureAirport', sql.NVarChar(10), leg.departureAirport || null)
            .input('departureDatetime', sql.DateTime(), leg.departureDatetime ? new Date(leg.departureDatetime) : null)
            .input('arrivalAirport', sql.NVarChar(10), leg.arrivalAirport || null)
            .input('arrivalDatetime', sql.DateTime(), leg.arrivalDatetime ? new Date(leg.arrivalDatetime) : null)
            .input('departureLat', sql.Float, leg.departureLat ?? null)
            .input('departureLon', sql.Float, leg.departureLon ?? null)
            .input('arrivalLat', sql.Float, leg.arrivalLat ?? null)
            .input('arrivalLon', sql.Float, leg.arrivalLon ?? null)
            .input('departureAirportName', sql.NVarChar(255), leg.departureAirportName ?? null)
            .input('arrivalAirportName', sql.NVarChar(255), leg.arrivalAirportName ?? null)
            .query(`
              INSERT INTO FlightLegs
                (TagID, JourneyType, Sequence, Carrier, FlightNumber,
                 DepartureAirport, DepartureDatetime, ArrivalAirport, ArrivalDatetime,
                 DepartureLat, DepartureLon, ArrivalLat, ArrivalLon,
                 DepartureAirportName, ArrivalAirportName)
              VALUES
                (@tagId, @journeyType, @sequence, @carrier, @flightNumber,
                 @departureAirport, @departureDatetime, @arrivalAirport, @arrivalDatetime,
                 @departureLat, @departureLon, @arrivalLat, @arrivalLon,
                 @departureAirportName, @arrivalAirportName)
            `);
        }
        await transaction.commit();
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
      await pool.close();
      return true;
    } catch (error) {
      console.error('Fehler beim Speichern der Flugreisen:', error);
      throw error;
    }
  }

  async getUserTags(userId: string): Promise<unknown[]> {
    try {
      const pool = await this.getPool();
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
