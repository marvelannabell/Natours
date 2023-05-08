const fs = require('fs')
const express = require('express');

const app = express();
app.use(express.json());//middleware

// app.get('/', (req, res) => {
//     res
//         .status(200)
//         .json({
//             message: 'Hello from the server side!',
//             app: 'Natours'
//         })
// });

// app.post('/',(req,res)=>{
// res.send('You can post this')
// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

//*route handler
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        result: tours.length,//if we are sending an arr
        data: { tours: tours }
    });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
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
});

app.delete('/api/v1/tours/:id', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});

