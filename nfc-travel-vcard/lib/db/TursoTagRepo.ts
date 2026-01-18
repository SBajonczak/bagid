import { createClient, Client } from '@libsql/client';
import { ITagRepo } from './ITagRepo';
import { getConfig } from '../config';

export class TursoTagRepo implements ITagRepo {
  private client: Client | null = null;
  private config;

  constructor() {
    const appConfig = getConfig();
    this.config = {
      url: appConfig.database.tursoUrl!,
      authToken: appConfig.database.tursoAuthToken,
    };
  }

  private getClient(): Client {
    if (!this.client) {
      this.client = createClient({
        url: this.config.url,
        authToken: this.config.authToken,
      });
    }
    return this.client;
  }

  async getTravelDataByTagId(tagId: string): Promise<unknown> {
    const client = this.getClient();
    const rs = await client.execute({
      sql: `SELECT 
            TagID as tagId,
            1 as hasData, 
            tagName,
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
          WHERE TagID = ? AND isRegistered=1`,
      args: [tagId]
    });

    if (rs.rows.length === 0) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const travelData: any = rs.rows[0];
    travelData.hasData = true;
    return travelData;
  }

  async updateTravelDataByTagId(tagId: string, updateData: Record<string, unknown>): Promise<boolean> {
    const client = this.getClient();
    
    const fieldMappings: Record<string, string> = {
      tagName: 'tagName',
      ownerFirstName: 'OwnerFirstName',
      ownerLastName: 'OwnerLastName',
      ownerAddress: 'OwnerAddress',
      ownerEmail: 'OwnerEmail',
      ownerMobile: 'OwnerMobile',
      ownerLandline: 'OwnerLandline',
      ownerOther: 'OwnerOther',
      guideFirstName: 'GuideFirstName',
      guideLastName: 'GuideLastName',
      guideEmail: 'GuideEmail',
      guideMobile: 'GuideMobile',
      guideLandline: 'GuideLandline',
      destinationAccommodation: 'DestinationAccommodation',
      destinationAddress: 'DestinationAddress',
      transportation: 'Transportation',
      transportationNumber: 'TransportationNumber',
      transportationDate: 'TransportationDate',
    };

    const checkRs = await client.execute({
      sql: 'SELECT 1 FROM TravelTag WHERE TagID = ?',
      args: [tagId]
    });

    if (checkRs.rows.length === 0) {
      // Insert
      const fields = ['TagID'];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const values: any[] = [tagId];
      const placeholders = ['?'];

      for (const key in updateData) {
        if (Object.prototype.hasOwnProperty.call(updateData, key)) {
          const dbField = fieldMappings[key];
          if (dbField && updateData[key] !== undefined) {
            fields.push(dbField);
            placeholders.push('?');

            let val = updateData[key];
            if (key === 'transportationDate' && val) {
              val = new Date(val as string).toISOString();
            }
            values.push(val);
          }
        }
      }

      const sql = `INSERT INTO TravelTag (${fields.join(', ')}) VALUES (${placeholders.join(', ')})`;
      await client.execute({ sql, args: values });
    } else {
      // Update
      const sets: string[] = [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const values: any[] = [];

      for (const key in updateData) {
        const dbField = fieldMappings[key];
        if (dbField && updateData[key] !== undefined) {
          sets.push(`${dbField} = ?`);
          let val = updateData[key];
          if (key === 'transportationDate' && val) {
            val = new Date(val as string).toISOString();
          }
          values.push(val);
        }
      }

      if (sets.length > 0) {
        values.push(tagId);
        const sql = `UPDATE TravelTag SET ${sets.join(', ')} WHERE TagID = ?`;
        await client.execute({ sql, args: values });
      }
    }
    return true;
  }

  async registerTagOwner(tagId: string, userId: string, userEmail: string): Promise<boolean> {
    const client = this.getClient();

    const checkRs = await client.execute({
      sql: `SELECT UserID FROM TagOwners WHERE TagID = ? AND UserID <> ?`,
      args: [tagId, userId]
    });

    if (checkRs.rows.length > 0) {
      console.log('Tag ist bereits registriert für einen anderen Benutzer:', checkRs.rows[0].UserID);
      return false;
    }

    const now = new Date().toISOString();

    await client.execute({
      sql: `INSERT INTO TagOwners (TagID, UserID, UserEmail, RegisteredAt) 
            VALUES (?, ?, ?, ?)
            ON CONFLICT(TagID, UserID) DO UPDATE SET 
              UserEmail = excluded.UserEmail,
              RegisteredAt = excluded.RegisteredAt`,
      args: [tagId, userId, userEmail, now]
    });

    await client.execute({
      sql: `UPDATE TravelTag SET isRegistered = 1 WHERE TagID = ?`,
      args: [tagId]
    });

    return true;
  }

  async verifyTagOwner(tagId: string, userId: string): Promise<boolean> {
    const client = this.getClient();
    const rs = await client.execute({
      sql: `SELECT 1 FROM TagOwners WHERE TagID = ? AND UserID = ?`,
      args: [tagId, userId]
    });
    return rs.rows.length > 0;
  }

  async tagExists(tagId: string): Promise<boolean> {
    const client = this.getClient();
    const rs = await client.execute({
      sql: `SELECT 1 FROM TravelTag WHERE TagID = ?`,
      args: [tagId]
    });

    if (rs.rows.length === 0) {
       await client.execute({
         sql: `INSERT INTO TravelTag (TagID, isRegistered) VALUES (?, 0)`,
         args: [tagId]
       });
    }
    return true;
  }

  async tagRegistered(tagId: string): Promise<boolean> {
    console.log(`Checking registration for tagId: ${tagId}}`);
    const client = this.getClient();
    const result = await client.execute({
      sql: 'SELECT 1 FROM TravelTag WHERE TagID = ? AND isRegistered=1',
      args: [tagId]
    });
    return result.rows.length > 0;
  }

  async getUserTags(userId: string): Promise<unknown[]> {
    const client = this.getClient();
    const result = await client.execute({
      sql: `SELECT t.TagID as tagId, t.tagName, t.OwnerFirstName as ownerFirstName, t.OwnerLastName as ownerLastName, 1 as hasData
          FROM TravelTag t
          JOIN TagOwners o ON t.TagID = o.TagID
          WHERE o.UserID = ?
          ORDER BY t.tagName`,
      args: [userId]
    });
    return result.rows;
  }
}
