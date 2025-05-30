// import sql from 'mssql';
// import { TravelData } from '../types';


// // Azure SQL Server configuration
// const sqlConfig = {
//     user: process.env.DB_USER || '',
//     password: process.env.DB_PASSWORD || '',
//     server: process.env.DB_SERVER || '',
//     database: process.env.DB_DATABASE || '',
//     options: {
//         encrypt: true, // Use encryption for Azure SQL
//         trustServerCertificate: false,
//     },
// };

// // TagRepo class for database operations
// export class TagRepo {
//     private pool: sql.ConnectionPool | undefined;

//     async connect() {
//         this.pool = await sql.connect(sqlConfig);
//     }

//     async persistTravelData(tagId: string, travelData: TravelData) {
//         if (!this.pool) throw new Error('Database connection not established');
//         const request = this.pool.request();
//         request.input('tagId', sql.VarChar, tagId);
//         request.input('hasData', sql.Bit, travelData.hasData);

//         // Owner/Kontakt
//         request.input('ownerFirstName', sql.VarChar, travelData.ownerFirstName);
//         request.input('ownerLastName', sql.VarChar, travelData.ownerLastName);
//         request.input('ownerAddress', sql.VarChar, travelData.ownerAddress);
//         request.input('ownerEmail', sql.VarChar, travelData.ownerEmail);
//         request.input('ownerMobile', sql.VarChar, travelData.ownerMobile);
//         request.input('ownerLandline', sql.VarChar, travelData.ownerLandline);
//         request.input('ownerOther', sql.VarChar, travelData.ownerOther ?? null);

//         // Guide
//         request.input('guideFirstName', sql.VarChar, travelData.guideFirstName);
//         request.input('guideLastName', sql.VarChar, travelData.guideLastName);
//         request.input('guideEmail', sql.VarChar, travelData.guideEmail);
//         request.input('guideMobile', sql.VarChar, travelData.guideMobile);
//         request.input('guideLandline', sql.VarChar, travelData.guideLandline);

//         // Zieladresse/Unterkunft
//         request.input('destinationAccommodation', sql.VarChar, travelData.destinationAccommodation);
//         request.input('destinationAddress', sql.VarChar, travelData.destinationAddress);
//         request.input('transportation', sql.VarChar, travelData.transportation);
//         request.input('transportationNumber', sql.VarChar, travelData.transportationNumber);
//         request.input('transportationDate', sql.DateTime, travelData.transportationDate);
//         // Füge weitere Felder nach Bedarf hinzu
//         await request.query(`
//             MERGE INTO TravelData AS target
//             USING (SELECT @tagId AS tagId) AS source
//             ON (target.tagId = source.tagId)
//             WHEN MATCHED THEN
//             UPDATE SET
//                 hasData = @hasData,
//                 ownerFirstName = @ownerFirstName,
//                 ownerLastName = @ownerLastName,
//                 ownerAddress = @ownerAddress,
//                 ownerEmail = @ownerEmail,
//                 ownerMobile = @ownerMobile,
//                 ownerLandline = @ownerLandline,
//                 ownerOther = @ownerOther,
//                 guideFirstName = @guideFirstName,
//                 guideLastName = @guideLastName,
//                 guideEmail = @guideEmail,
//                 guideMobile = @guideMobile,
//                 guideLandline = @guideLandline,
//                 destinationAccommodation = @destinationAccommodation,
//                 destinationAddress = @destinationAddress,
//                 transportation = @transportation,
//                 transportationNumber = @transportationNumber,
//                 transportationDate = @transportationDate
//             WHEN NOT MATCHED THEN
//             INSERT (
//                 tagId,
//                 hasData,
//                 ownerFirstName,
//                 ownerLastName,
//                 ownerAddress,
//                 ownerEmail,
//                 ownerMobile,
//                 ownerLandline,
//                 ownerOther,
//                 guideFirstName,
//                 guideLastName,
//                 guideEmail,
//                 guideMobile,
//                 guideLandline,
//                 destinationAccommodation,
//                 destinationAddress,
//                 transportation,
//                 transportationNumber,
//                 transportationDate
//             )
//             VALUES (
//                 @tagId,
//                 @hasData,
//                 @ownerFirstName,
//                 @ownerLastName,
//                 @ownerAddress,
//                 @ownerEmail,
//                 @ownerMobile,
//                 @ownerLandline,
//                 @ownerOther,
//                 @guideFirstName,
//                 @guideLastName,
//                 @guideEmail,
//                 @guideMobile,
//                 @guideLandline,
//                 @destinationAccommodation,
//                 @destinationAddress,
//                 @transportation,
//                 @transportationNumber,
//                 @transportationDate
//             );
//         `);
//     }

//     async getTravelDataByTagId(tagId: string): Promise<TravelData | null> {
//         if (!this.pool) throw new Error('Database connection not established');
//         const result = await this.pool
//             .request()
//             .input('tagId', sql.VarChar, tagId)
//             .query('SELECT * FROM TravelData WHERE tagId = @tagId');
//         return result.recordset[0] || null;
//     }

//     async close() {
//         if (this.pool) await this.pool.close();
//     }
// }
