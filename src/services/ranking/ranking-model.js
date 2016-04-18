'use strict';

// ranking-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const rankingSchema = new Schema({
  user: { type: ObjectId, ref: 'user' },
  ranks: [{type: ObjectId, ref: 'team' }],
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const rankingModel = mongoose.model('ranking', rankingSchema);

module.exports = rankingModel;