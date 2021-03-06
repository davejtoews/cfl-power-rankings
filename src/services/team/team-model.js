'use strict';

// team-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  location: { type: String, required: true },
  nickname: { type: String, required: true },
  cflId: { type: Number, required: true, unique: true},
  flair: {type: String, required: true},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const teamModel = mongoose.model('team', teamSchema);

module.exports = teamModel;