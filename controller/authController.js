const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../middleware/config');
const connectDatabase = require('../DB/connectDb');

const generateToken = (id) => {
    const payload = { id };
    return jwt.sign(payload, secret, { expiresIn: '1h' });
}

class AuthController {
    async register(req, res) {

        
        const { name, lastName, email, password, age } = req.body;

        try {
            // Получаем клиент из функции connectDatabase
            const db = await connectDatabase();

            // Хэшируем пароль
            const hashPassword = await bcrypt.hash(password, 10);

            // Проверяем, существует ли уже пользователь с таким email
            const result = await db.query('SELECT * FROM db_User WHERE usr_email = $1', [email]);

            if (result.rows.length > 0) {
                return res.status(200).json({ message: 'Email already exists' });
            }

            // Если пользователь не существует, регистрируем нового пользователя
            await db.query(
                'INSERT INTO db_User (usr_name, usr_lastname, usr_email, usr_password, usr_age) VALUES ($1, $2, $3, $4, $5)',
                [name, lastName, email, hashPassword, age]
            );

            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        try {
            // Получаем клиент из функции connectDatabase
            const db = await connectDatabase();
            
            // Проверяем, существует ли пользователь с таким email
            const result = await db.query('SELECT * FROM db_User WHERE usr_email = $1', [email]);
            

            if (result.rows.length === 0) {
                return res.status(200).json({ message: 'User not found' });
            }
            

            const user = result.rows[0];
            
            // Проверяем, верны ли пароли
            const isPasswordValid = await bcrypt.compare(password, user.usr_password);
            
            if (!isPasswordValid) {
                return res.status(200).json({ message: 'Password invalid' });
            }
            
            // Если пароли верны, генерируем и отправляем токен
            const token = generateToken(user.usr_id);

            // Сохраняем токен в базе данных
            await db.query('UPDATE db_User SET usr_token = $1 WHERE usr_id = $2', [token, user.usr_id]);
            
            res.json({ message: 'User logged in successfully', token });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new AuthController();
