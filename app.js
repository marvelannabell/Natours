const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoute');
const userRouter =require('./routes/userRoute');

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

app.use('/api/v1/tours', tourRouter);//MW
app.use('/api/v1/users', userRouter);//MW



//4.)Start Server;
const port = 3000;
app.listen(port, () => {
    console.log(`app running on port ${port}`);
});

