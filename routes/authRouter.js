const Router = require('express')
const controller = require('../controller/authController');

const router = Router();


router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/get-users', controller.getUsers);
module.exports = router;