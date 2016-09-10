'use strict';

const app = require('express')();
const userRoutes = require('./routes/user');
const config = require('./config.js');
const db = require('mongoose').connect(config.MONGO_URL).connection;
const jsonParser = require('body-parser').json();

app.post('/user', jsonParser, userRoutes.create);
app.get('/user/:id', userRoutes.read);
app.put('/user/:id', userRoutes.update);
app.delete('/user/:id', userRoutes.delete);
app.get('/users', userRoutes.list);

app.use((err, req, res, next) => {
    res.status(config.httpResponses.SERVER_ERROR).send({ error: err });
});

db.on('error', console.error.bind(console, 'Error connecting to Mongo Database:'));
db.once('open', function() {
    console.log('Connected to Mongo Database');

    app.listen(config.APP_PORT, () => console.log('User API listening on port 3000!'));
});

module.exports = app;
