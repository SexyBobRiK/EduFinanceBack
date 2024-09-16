const Router = require('express')
const middleware = require("../middleware/middleware");
const controller = require('../controller/causeController');

const router = Router();


router.post('/insert-cause', middleware, controller.insertCause);


module.exports = router;