const router = require('express').Router();

const { getHeaderController, setHeaderController } = require('../controllers/headerController');

router.get('/set', setHeaderController);
router.get('/get/:headerTitle', getHeaderController);

module.exports = router;
