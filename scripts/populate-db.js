'use strict';

const config = require('../config');
const db = require('mongoose').connect(config.MONGO_URL).connection;
const userList = require('../resources/users').users;
const User = require('../models/User');

db.on('error', console.error.bind(console, 'Error connecting to Mongo Database:'));
db.once('open', function() {
    console.log('Connected to Mongo Database');

    User.collection.insert(userList, () => {
            console.log('Users added to Database');
    });

    db.close();
});
