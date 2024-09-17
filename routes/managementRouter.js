const Router = require('express')
const middleware = require("../middleware/middleware");
const controller = require('../controller/managementController');

const router = Router();


router.post('/insert-managements', middleware, controller.insertManagement);


module.exports = router;