'use strict';

const supertest = require('supertest');
const app = require('../../server');
const config = require('../../config');
const httpResponses = config.httpResponses;
const errorObjects = config.errorObjects;
const assert = require('assert');
const User = require('../../models/User');

const user = {
    "gender": "male",
    "name": {
        "title": "mr",
        "first": "andy",
        "last": "adams"
    },
    "location": {
        "street": "5857 woodlawn avenue",
        "city": "Westport",
        "state": "alaska",
        "zip": 71280
    },
    "email": "andy.adams@example.com",
    "username": "newUserName",
    "password": "123457",
    "salt": "HsxzewdQ",
    "md5": "5809e5fda81eed34bad9ca6eff414924",
    "sha1": "6c95f0d9210e88028074d4baaeefc3d6c830a9a3",
    "sha256": "f92fc585c017d093b03dba898162613380f137f934637c5bf9050fe68c103c54",
    "registered": 1180746503,
    "dob": 1028583070,
    "phone": "041-252-0953",
    "cell": "081-567-1935",
    "PPS": "2470896T",
    "picture": {
        "large": "https://randomuser.me/api/portraits/men/75.jpg",
        "medium": "https://randomuser.me/api/portraits/med/men/75.jpg",
        "thumbnail": "https://randomuser.me/api/portraits/thumb/men/75.jpg"
    }
};

describe('User API Integration Tests', () => {

    it('Should create a new user', (done) => {
        supertest(app)
            .post('/user')
            .send(user)
            .expect(httpResponses.CREATED)
            .end((err, response) => {

                assert.ok(!err);
                assert.ok(response.body.username === 'newUserName');
                assert.ok(response.body._id);

                done();
            });
    });

    it('Should fail to create a new user because of invalid id', (done) => {
        supertest(app)
            .post('/user')
            .send(user)
            .expect(httpResponses.CONFLICT)
            .end((err, response) => {

                assert.ok(!err);
                assert.ok(response.body.error === errorObjects.DUPLICATE_KEY_ERROR.error);

                return User.remove({ username: 'newUserName' }, done);
            });
    });

    it('Should return a user', (done) => {
        supertest(app)
            .get('/user/tinywolf709')
            .expect(httpResponses.OK)
            .end((err, response) => {

                assert.ok(!err);
                assert.ok(response.body.username === 'tinywolf709');

                return done();
            });
    });

    it('Should fail to return a user for invalid id', (done) => {
        supertest(app)
            .get('/user/idDoesNotExist')
            .expect(httpResponses.NOT_FOUND)
            .end((err, response) => {

                assert.ok(!err);
                assert.ok(response.body.error === errorObjects.NOT_FOUND_ERROR.error);

                return done();
            });
    });

    it('Should update a user', (done) => {
        supertest(app)
            .put('/user/1234')
            .expect(httpResponses.OK)
            .end((err, response) => {
                assert.ok(!err);
                assert.ok(response.text === 'update');
                return done();
            });
    });

    it('Should delete a user', (done) => {
        supertest(app)
            .delete('/user/1234')
            .expect(httpResponses.OK)
            .end((err, response) => {
                assert.ok(!err);
                assert.ok(response.text === 'delete');
                return done();
            });
    });

    it('Should list all users', (done) => {
        supertest(app)
            .get('/users')
            .expect(httpResponses.OK)
            .end((err, response) => {
                assert.ok(!err);
                assert.ok(response.text === 'list');
                return done();
            });
    });

});
