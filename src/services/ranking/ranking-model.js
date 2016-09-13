'use strict';

// ranking-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const rankingSchema = new Schema({
  user: { type: ObjectId, ref: 'user', required: true },
  ranks: {
  	type: [{type: ObjectId, ref: 'team' }], 
  	validate: [teamArrayLimit, 'Incorrect number of teams']

  },
  week: { type: ObjectId, ref: 'week', required: true },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

function teamArrayLimit(val) {
  return val.length == 9;
}

const rankingModel = mongoose.model('ranking', rankingSchema);

module.exports = rankingModel;