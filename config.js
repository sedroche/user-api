'use strict';

exports.httpResponses = {
    OK: 200,
    SERVER_ERROR: 500,
    NOT_FOUND: 404
};

exports.APP_PORT = 3000;

exports.errorObjects = {
    NOT_FOUND_ERROR: { error: 'User id is invalid' },
    SERVER_ERROR: { error: 'Server error' }
};

exports.MONGO_URL = 'mongodb://localhost:27017/redhat';
