'use strict';

const supertest = require('supertest');
const app = require('../../server');
const httpResponses = require('../../config').httpResponses;
const assert = require('assert');

describe('User API Integration Tests', () => {

    it('Should create a new user', (done) => {
        supertest(app)
            .post('/user')
            .expect(httpResponses.OK)
            .end((err, response) => {
                assert.ok(!err);
                assert.ok(response.text === 'create');
                return done();
            });
    });

    it('Should return a new user', (done) => {
        supertest(app)
            .get('/user/1234')
            .expect(httpResponses.OK)
            .end((err, response) => {
                assert.ok(!err);
                assert.ok(response.text === 'read');
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
