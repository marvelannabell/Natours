const express = require('express');

//status 500 === internal server error
const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined  defined yet!'
    });
};

const getOneUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined  defined yet!'
    });
};
const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined  defined yet!'
    });
};
const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined  defined yet!'
    });
};

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined  defined yet!'
    });
};

const router = express.Router();//MW f\



router.route('/')// '/' route of our sub app
.get(getAllUsers)
.post(createUser);

router.route('/:id')
.get(getOneUser)
.patch(updateUser)
.delete(deleteUser);


module.exports= router
