'use strict';

// week-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const weekSchema = new Schema({
  name: { type: String, required: true },
  year: { type: ObjectId, ref: 'year' },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const weekModel = mongoose.model('week', weekSchema);

module.exports = weekModel;