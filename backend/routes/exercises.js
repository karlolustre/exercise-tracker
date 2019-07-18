const express = require('express');

const router = express.Router();

const exerciseModel = require('../models/exercise');

//retrieve exercises
router.get('/', (req, res) => {
    exerciseModel.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error : ' +err))
});

//retrieve single exercise
router.get('/:id', (req, res) => {
    exerciseModel.findById(req.params.id)
    .then (exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error : ' + err))
})

//delete single
router.delete('/:id', (req, res) => {
    exerciseModel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error + ' + err));
})

//update
router.post('/update/:id', (req, res) => {
    exerciseModel.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error + ' + err));
    })
    .catch(err => res.status(400).json('Error + ' + err));
})

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