'use strict';

const User = require('../models/User');
const config = require('../config');
const httpResponses = config.httpResponses;
const errorObjects = config.errorObjects;

var parseFilterQuery = (filter) => {
    if (typeof filter !== 'string') return;

    filter = filter.split(' ');
    if (filter.length < 3) return null;

    let filterObject = {};
    let comparator = {};

    let path = filter[0];
    let operator = filter[1];

    comparator[operator] = filter.length == 3 ? filter[2] : filter.splice(2, filter.length).join(' ');
    filterObject[path] = comparator;

    return filterObject;
};

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
    let filterObject = req.query.filter ? parseFilterQuery(req.query.filter) : {};

    User.find(filterObject)
        .sort(req.query.sort || '')
        .exec((err, users) => {
            if (err) {
                return res.status(httpResponses.SERVER_ERROR).send(errorObjects.SERVER_ERROR);
            }

            return res.status(httpResponses.OK).send(users);
        });
};
