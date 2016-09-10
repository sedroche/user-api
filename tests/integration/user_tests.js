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

const apiUrl = '/user/';
const userListUrl = '/users/';
const sucessUserName = 'tinywolf709';
const successUserURL = apiUrl + sucessUserName;
const failUserUrl = apiUrl + 'idDoesNotExist';

var isArraySorted = (array, descending) => {
    for (let i = 0; i < array.length - 1; i++) {
        let first = descending ? array[i + 1] : array[i];
        let second = descending ? array[i] : array[i + 1];
        if (first > second) {
            return false;
        }
    }
    return true;
};

describe('User API Integration Tests', () => {

    it('Should create a new user', (done) => {
        supertest(app)
            .post(apiUrl)
            .send(user)
            .expect(httpResponses.CREATED)
            .end((err, response) => {

                assert.ok(!err);
                assert.ok(response.body.username === user.username);
                assert.ok(response.body._id);

                done();
            });
    });

    it('Should fail to create a new user because of invalid id', (done) => {
        supertest(app)
            .post(apiUrl)
            .send(user)
            .expect(httpResponses.CONFLICT)
            .end((err, response) => {

                assert.ok(!err);
                assert.ok(response.body.error === errorObjects.DUPLICATE_KEY_ERROR.error);

                return User.remove({ username: user.username }, done);
            });
    });

    it('Should return a user', (done) => {
        supertest(app)
            .get(successUserURL)
            .expect(httpResponses.OK)
            .end((err, response) => {

                assert.ok(!err);
                assert.ok(response.body.username === sucessUserName);

                return done();
            });
    });

    it('Should fail to return a user for invalid id', (done) => {
        supertest(app)
            .get(failUserUrl)
            .expect(httpResponses.NOT_FOUND)
            .end((err, response) => {

                assert.ok(!err);
                assert.ok(response.body.error === errorObjects.NOT_FOUND_ERROR.error);

                return done();
            });
    });

    it('Should update a user', (done) => {
        supertest(app)
            .put(successUserURL)
            .send({ gender: 'male' })
            .expect(httpResponses.OK)
            .end((err, response) => {

                let user = response.body;

                assert.ok(!err);
                assert.ok(user.username === sucessUserName);
                assert.ok(user.gender === 'male');

                return User.findOneAndUpdate({ username: user.username }, { gender: 'female' }, done);
            });
    });

    it('Should fail to update a user for invalid id', (done) => {
        supertest(app)
            .put(failUserUrl)
            .send({ gender: 'male' })
            .expect(httpResponses.NOT_FOUND)
            .end((err, response) => {

                assert.ok(!err);
                assert.ok(response.body.error === errorObjects.NOT_FOUND_ERROR.error);

                return User.findOneAndUpdate({ username: user.username }, { gender: 'female' }, done);
            });
    });

    it('Should delete a user', (done) => {
        let userModel = new User(user);

        userModel.save((err) => {
            supertest(app)
                .delete(apiUrl + user.username)
                .expect(httpResponses.OK)
                .end((err, response) => {

                    assert.ok(!err);

                    return done();
                });
        });
    });

    it('Should fail to delete a user for invalid id', (done) => {
        supertest(app)
            .delete(failUserUrl)
            .expect(httpResponses.NOT_FOUND)
            .end((err, response) => {

                assert.ok(!err);
                assert.ok(response.body.error === errorObjects.NOT_FOUND_ERROR.error);

                return done();
            });
    });

    it('Should list all users', (done) => {
        supertest(app)
            .get(userListUrl)
            .expect(httpResponses.OK)
            .end((err, response) => {

                assert.ok(!err);
                assert.ok(Array.isArray(response.body));

                return done();
            });
    });

    it('Should list all users sorted by email ascending', (done) => {
        supertest(app)
            .get(userListUrl + '?sort=email')
            .expect(httpResponses.OK)
            .end((err, response) => {

                let users = response.body;

                assert.ok(!err);
                assert.ok(Array.isArray(users));

                assert.ok(isArraySorted(users, false));

                return done();
            });
    });

    it('Should list all users sorted by email descending', (done) => {
        supertest(app)
            .get(userListUrl + '?sort=-email')
            .expect(httpResponses.OK)
            .end((err, response) => {

                let users = response.body;

                assert.ok(!err);
                assert.ok(Array.isArray(users));

                assert.ok(isArraySorted(users, true));

                return done();
            });
    });

    it('Should filter all users by female gender', (done) => {
        supertest(app)
            .get(userListUrl + '?filter=gender $eq female')
            .expect(httpResponses.OK)
            .end((err, response) => {

                let users = response.body;

                assert.ok(!err);
                assert.ok(Array.isArray(users));

                assert.ok(users.every((user) => {
                    return user.gender === 'female';
                }));

                return done();
            });
    });

    it('Should filter all users by sub property name.title of "miss"', (done) => {
        supertest(app)
            .get(userListUrl + '?filter=name.title $eq miss')
            .expect(httpResponses.OK)
            .end((err, response) => {

                let users = response.body;

                assert.ok(!err);
                assert.ok(Array.isArray(users));

                assert.ok(users.every((user) => {
                    return user.name.title === 'miss';
                }));

                return done();
            });
    });
});
