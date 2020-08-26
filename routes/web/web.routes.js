const express = require('express');
const router = express.Router();

const {home} = require('../../controllers/web/web.controllers');

router.get('/', home);

module.exports = router;