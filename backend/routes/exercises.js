const express = require('express');

const router = express.Router();

const exerciseModel = require('../models/exercise');

//retrieve exercises
router.get('/', (req, res) => {
    exerciseModel.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error : ' +err))
});

//add exercise
router.post('/add', (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new exerciseModel({
        username,
        description,
        duration,
        date,
    });
    
    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error : ' + err))
})

module.exports = router