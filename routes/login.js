let express = require('express');
let router = express.Router();
let Login = require('../models/login');

router.get('/login', (req,res) => {
    res.render('login');
})