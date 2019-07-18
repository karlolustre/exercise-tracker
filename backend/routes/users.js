const express = require('express');

const router = express.Router();

const userModel = require('../models/user');

//retrieve users
router.get('/', (req, res) => {
    userModel.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error : ' + err));
});

//create users
router.post('/add', (req, res) => {
    const username = req.body.username;

    const newUser = new userModel({username});

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error : ' + err));
})

module.exports = router;


