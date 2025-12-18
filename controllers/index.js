const express = require('express');
const userRouter = require('./user/index');



const app = express();


app.use('/user', userRouter);


module.exports = app;