import express from 'express';
import sql from 'mssql';

const app = express();
const port = 3000;

// Azure SQL Server configuration
const sqlConfig = {
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    server: process.env.DB_SERVER || '',
    database: process.env.DB_DATABASE || '',
    options: {
        encrypt: true, // Use encryption for Azure SQL
        trustServerCertificate: false,
    },
};

// Endpoint to fetch TravelData by tagId
app.get('/api/travel-data/:tagId', async (req:any, res:any) => {
    const { tagId } = req.params;

    let pool: sql.ConnectionPool | undefined;
    try {
        // Connect to the database
        const connection = await sql.connect(sqlConfig);
        pool = connection;

        // Query the database
        const result = await pool
            .request()
            .input('tagId', sql.VarChar, tagId)
            .query('SELECT * FROM TravelData WHERE tagId = @tagId');

        const travelData = result.recordset[0];

        if (!travelData) {
            return res.status(404).json({ error: 'Data not found for the given tagId' });
        }

        res.json(travelData);
    } catch (error) {
        console.error('Error fetching travel data:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        if (pool) await pool.close();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});
