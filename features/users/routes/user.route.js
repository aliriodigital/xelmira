const express = require('express');
const router = express.Router();
const path = require('path');


const userController = require('../controllers/user.controller');

router.get('/user', userController.homeUser);

router.post('/add/user', userController.addUser);

router.post('/edit/user/:id', userController.editUser);

router.get('/delete/user/:id', userController.deleteUser);

module.exports = router;