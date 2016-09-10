'use strict';

exports.httpResponses = {
    OK: 200,
    CREATED: 201,
    SERVER_ERROR: 500,
    NOT_FOUND: 404,
    CONFLICT: 409
};

exports.DUPLICATE_KEY_CODE = 11000;

exports.APP_PORT = 3000;

exports.errorObjects = {
    NOT_FOUND_ERROR: { error: 'User id is invalid' },
    SERVER_ERROR: { error: 'Server error' },
    DUPLICATE_KEY_ERROR: { error: 'Duplicate Key' }
};

exports.MONGO_URL = 'mongodb://localhost:27017/redhat';
