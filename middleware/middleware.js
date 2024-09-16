const jwt = require("jsonwebtoken");
const { secret } = require("../middleware/config");

module.exports = function (req, res, next) {
	if (req.method === "OPTIONS") {
		next();
		return; // Добавлен return, чтобы предотвратить дальнейшее выполнение кода
	}

	try {
		// Проверка наличия заголовка Authorization
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(403).json({ message: "Пользователь не авторизован" });
		}

		// Разбиение заголовка на части и получение токена
		const token = authHeader.split(" ")[1];
		if (!token) {
			return res.status(403).json({ message: "Пользователь не авторизован" });
		}

		// Проверка и декодирование токена
		const decodedData = jwt.verify(token, secret);
		req.user = decodedData;
		next();
	} catch (e) {
		console.log(e);
		return res.status(403).json({ message: "Пользователь не авторизован" });
	}
};
