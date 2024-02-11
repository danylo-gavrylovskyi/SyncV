const router = require('express').Router();
const docs = require('../public/docs');

router.get('/', (req, res) => res.json(docs));

module.exports = router;
