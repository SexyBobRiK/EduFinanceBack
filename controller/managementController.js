const jwt = require('jsonwebtoken');
const { secret } = require('../middleware/config');
const connectDatabase = require('../DB/connectDb');

class managementController {
    async insertManagement(req, res) {
        const { sum, date, causeID, typeID } = req.body;

        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        try {
            const decodedData = jwt.verify(token, secret);
            const userId = decodedData.id;

            const client = await connectDatabase();

            await client.query(
                'INSERT INTO db_management (mng_userid, mng_typeid, mng_causeid, mng_value, mng_date ) VALUES ($1, $2, $3, $4, $5)',
                [userId, typeID , causeID, sum, date]
            );

            res.status(200).json({ message: 'Cause inserted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    }

    async getManagement(req, res) {
        const token = req.headers['authorization']?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        try {
            const decodedData = jwt.verify(token, secret);
            const userId = decodedData.id;

            const client = await connectDatabase();
            const management = await client.query(
                'SELECT cs_causevalue, mng_value FROM public.db_management LEFT JOIN db_cause on cs_id = mng_causeid WHERE mng_typeid = 2 AND mng_userid = $1',
                [userId]
            );

            res.json(management.rows);
            
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
}
}
module.exports = new managementController();
