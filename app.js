const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
//1) MWs
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'));
};
app.use(express.json());//middleware
app.use(express.static(`${__dirname}/public`));//serve static files from folder, not from route

app.use((req, res, next) => {
    console.log('Hello from MW');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/tours', tourRouter);//MW
app.use('/api/v1/users', userRouter);//MW

module.exports = app;



