const jwt = require('jsonwebtoken');
const { secret } = require('../middleware/config');
const connectDatabase = require('../DB/connectDb');

class CauseController {
    async insertCause(req, res) {
        const { causeName, type} = req.body;
        
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        try {
            const decodedData = jwt.verify(token, secret);
            const userId = decodedData.id;


            const client = await connectDatabase();

            await client.query(
                'INSERT INTO db_cause (cs_causevalue, cs_userid, cs_typeid ) VALUES ($1, $2, $3)',
                [causeName, userId, type]
            );

            res.status(200).json({ message: 'Cause inserted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
        }
    }
}

module.exports = new CauseController();
