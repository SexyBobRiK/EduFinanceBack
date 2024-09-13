const { Client } = require('pg');

const connectDatabase = async () => {
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'db_Users',
        password: 'Qwerty123',
        port: 5432,
    });

    try {
        await client.connect();
        console.log('Database connection successful');
        return client;
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1);
    }
};

module.exports = connectDatabase;
