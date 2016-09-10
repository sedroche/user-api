'use strict';

const httpResponses = require('../config').httpResponses;

exports.create = (req, res) => {
    res.status(httpResponses.OK).send('create');
};

exports.read = (req, res) => {
    res.status(httpResponses.OK).send('read');
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
