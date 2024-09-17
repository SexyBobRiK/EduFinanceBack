const Router = require('express')
const middleware = require("../middleware/middleware");
const controller = require('../controller/causeController');

const router = Router();


router.post('/insert-cause', middleware, controller.insertCause);
router.get('/get-causes-income', middleware, controller.getCauses);
router.get('/get-causes-order', middleware, controller.getCausesOrder);

module.exports = router;