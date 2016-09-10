'use strict';

const app = require('express')();
const userRoutes = require('./routes/user');
const config = require('./config.js');

app.post('/user', userRoutes.create);
app.get('/user/:id', userRoutes.read);
app.put('/user/:id', userRoutes.update);
app.delete('/user/:id', userRoutes.delete);
app.get('/users', userRoutes.list);

app.use((err, req, res, next) => {
    res.status(config.httpResponses.SERVER_ERROR).send({error: 'Server Error'});
});

app.listen(config.APP_PORT, () => console.log('User API listening on port 3000!'));

module.exports = app;
