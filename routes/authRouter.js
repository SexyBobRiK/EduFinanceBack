const Router = require('express')
const middleware = require("../middleware/middleware");
const controller = require('../controller/authController');

const router = Router();


router.post('/register', controller.register);
router.post('/login', controller.login);

module.exports = router;