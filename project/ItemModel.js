// ItemModel.js
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 0,
    min: 0
  },
  price: {
    type: Number,
    default: 0,
    min: 0
  }
});

class ItemModel {
  // add additional class/instance methods here
}

schema.loadClass(ItemModel);

module.exports = mongoose.model('ItemModel', schema);
