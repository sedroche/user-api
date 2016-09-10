'use strict';

const User = require('../models/User');
const config = require('../config');
const httpResponses = config.httpResponses;
const errorObjects = config.errorObjects;

exports.create = (req, res) => {
    let user = new User(req.body);
    user.save(req.body, function(err, user) {
        if (err) {
            if (err.code === config.DUPLICATE_KEY_CODE) {
                return res.status(httpResponses.CONFLICT).send(errorObjects.DUPLICATE_KEY_ERROR);
            }

            return res.status(httpResponses.SERVER_ERROR).send(errorObjects.SERVER_ERROR);
        }

        return res.status(httpResponses.CREATED).send(user);
    });
};

exports.read = (req, res) => {
    User.findOne({ username: req.params.id }, (err, user) => {
        if (err) {
            return res.status(httpResponses.SERVER_ERROR).send(errorObjects.SERVER_ERROR);
        }

        if (!user) {
            return res.status(httpResponses.NOT_FOUND).send(errorObjects.NOT_FOUND_ERROR);
        }

        return res.status(httpResponses.OK).send(user);
    });
};

exports.update = (req, res) => {
    res.status(httpResponses.OK).send('update');
};

exports.delete = (req, res) => {
    res.status(httpResponses.OK).send('delete');
};

exports.list = (req, res) => {
    res.status(httpResponses.OK).send('list');
};
