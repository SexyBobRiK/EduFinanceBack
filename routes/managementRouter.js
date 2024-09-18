const Router = require('express')
const middleware = require("../middleware/middleware");
const controller = require('../controller/managementController');

const router = Router();


router.post('/insert-managements', middleware, controller.insertManagement);
router.get('/get-managements', middleware, controller.getManagement);


module.exports = router;