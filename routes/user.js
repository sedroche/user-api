'use strict';

const User = require('../models/User');
const config = require('../config');
const httpResponses = config.httpResponses;
const errorObjects = config.errorObjects;

exports.create = (req, res) => {
    let userModel = new User(req.body);
    userModel.save((err) => {
        if (err) {
            if (err.code === config.DUPLICATE_KEY_CODE) {
                return res.status(httpResponses.CONFLICT).send(errorObjects.DUPLICATE_KEY_ERROR);
            }

            return res.status(httpResponses.SERVER_ERROR).send(errorObjects.SERVER_ERROR);
        }

        return res.status(httpResponses.CREATED).send(userModel);
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
    User.findOneAndUpdate({ username: req.params.id }, { $set: req.body }, { 'new': true }, (err, user) => {
        if (err) {
            return res.status(httpResponses.SERVER_ERROR).send(errorObjects.SERVER_ERROR);
        }

        if (!user) {
            return res.status(httpResponses.NOT_FOUND).send(errorObjects.NOT_FOUND_ERROR);
        }

        return res.status(httpResponses.OK).send(user);
    });
};

exports.delete = (req, res) => {
    User.remove({ username: req.params.id }, (err, response) => {
        if (err) {
            return res.status(httpResponses.SERVER_ERROR).send(errorObjects.SERVER_ERROR);
        }

        if (response.result.n === 0) {
            return res.status(httpResponses.NOT_FOUND).send(errorObjects.NOT_FOUND_ERROR);
        }

        return res.status(httpResponses.OK).end();
    });
};

exports.list = (req, res) => {
    User.find({})
        .sort(req.query.sort || '')
        .exec((err, users) => {
            if (err) {
                return res.status(httpResponses.SERVER_ERROR).send(errorObjects.SERVER_ERROR);
            }

            return res.status(httpResponses.OK).send(users);
        });
};
