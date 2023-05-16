const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.checkID = (req, res, next, val) => {
    console.log(`Tour id is ${val}`);
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({ //we have return here and if there is an error, function will return and never move on to next!!!, if we don`t have retur, code will move on with next()
            status: 'fail',
            message: 'invalid ID'
        });
    };
    next();
};


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
    // console.log(req.params);
    const id = req.params.id * 1
    const tour = tours.find(x => x.id === id);

    // if (id > tours.length) {
   

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
 
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour>'
        }
    });
};

exports.deleteTour = (req, res) => {

    //status 204 ===no contetn
    res.status(204).json({
        status: 'success',
        data: null
    });
};
