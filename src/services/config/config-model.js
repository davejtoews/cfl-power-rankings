'use strict';

// config-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const configSchema = new Schema({
  name: { type: String, required: true, unique: true },
  value: {type: String},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const configModel = mongoose.model('config', configSchema);

module.exports = configModel;