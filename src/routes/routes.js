const express = require('express');

const app = express();

const webRoute = require('./web/web');
const userRoute = require('./user/user');
const postRoute = require('./post/post');

// Realiza a centralização e organização de todas as rotas do express.

app.use('/', webRoute);
app.use('/user', userRoute);
app.use('/post', postRoute);

module.exports = app;