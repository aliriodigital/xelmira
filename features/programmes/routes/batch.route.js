const express = require('express');
const router = express.Router();
const path = require('path');

const batchController = require('../controllers/batch.controller');
router.get('/batch', batchController.batchHome);

router.post('/add/batch', batchController.addBatch);

router.post('/edit/batch/:id', batchController.editBatch);

router.get('/delete/batch/:id', batchController.deleteBatch);

module.exports = router;