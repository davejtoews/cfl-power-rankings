'use strict';

// year-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const yearSchema = new Schema({
  year: { type: Number, required: true, min: 2016, max: 2099},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const yearModel = mongoose.model('year', yearSchema);

module.exports = yearModel;