const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();//MW function


router.route('/')// '/' route of our sub app
    .get(tourController.getAllTours)
    .post(tourController.createTour);

router.route('/:id')
    .get(tourController.getOneTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;

