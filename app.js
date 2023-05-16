const fs = require('fs')
const express = require('express');
const morgan = require('morgan');

const { createVerify } = require('crypto');

const app = express();
//1) MWs
app.use(morgan('dev'));

app.use(express.json());//middleware

app.use((req, res, next) => {
    console.log('Hello from MW');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
//2) Route handlers
const getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        result: tours.length,//if we are sending an arr
        data: { tours: tours }
    });
};

const getOneTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1
    const tour = tours.find(x => x.id === id);

    // if (id > tours.length) {
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        });
    };

    res.status(200).json({
        status: 'success',
        data: { tour: tour }
        // result: tours.length,//if we are sending an arr
        // data: { tours: tours }
    });
}

const createTour = (req, res) => {
    // console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ is: newId }, req.body);

    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        //status 201 === add data
        res.status(201).json({
            status: 'success',
            data: { tour: newTour }
        });
    })//not writeFileSync because we dont want to block eventLoop, we are in the callback f!!!
    // res.send('Done');
};

const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        });
    };
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour>'
        }
    });
};

const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'invalid ID'
        });
    };
    //status 204 ===no contetn
    res.status(204).json({
        status: 'success',
        data: null
    });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getOneTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
//3) Routes
app.route('/api/v1/tours')
    .get(getAllTours)
    .post(createTour);

app.route('/api/v1/tours/:id')
    .get(getOneTour)
    .patch(updateTour)
    .delete(deleteTour);

    //4.)Start Server;
const port = 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});

