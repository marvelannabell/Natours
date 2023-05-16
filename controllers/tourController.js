const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        result: tours.length,//if we are sending an arr
        data: { tours: tours }
    });
};

exports.getOneTour = (req, res) => {
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

exports.createTour = (req, res) => {
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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