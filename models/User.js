'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nameSchema = new Schema({
    title: String,
    first: String,
    last: String
});

const locationSchema = new Schema({
    street: String,
    city: String,
    state: String,
    zip: Number
});

const pictureSchema = new Schema({
    large: String,
    medium: String,
    thumbnail: String
});

const UserSchema = new Schema({
    gender: String,
    name: nameSchema,
    location: locationSchema,
    email: String,
    username: { type: String, required: true, unique: true },
    password: String,
    salt: String,
    md5: String,
    sha1: String,
    sha256: String,
    registered: Number,
    dob: Number,
    phone: String,
    cell: String,
    PPS: String,
    picture: pictureSchema
});

module.exports = mongoose.model('users', UserSchema);
