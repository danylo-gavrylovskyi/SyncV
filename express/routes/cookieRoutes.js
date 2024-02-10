const router = require('express').Router();

const { getCookieController, setCookieController } = require('../controllers/cookieController');

router.get('/set', setCookieController);
router.get('/get/:cookieTitle', getCookieController);

module.exports = router;
