const { Schema, Model } = require('mongoose');


const itemSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  wishRank: {
    type: Number,
  },
  cost: {
    type: Number,
  },
  notes: {
    type: String,
    required: false,
  },
  purchased: {
    type: Boolean,
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },

},{
  timestamps: true
});

const Item = model('Item', itemSchema);

module.exports = itemSchema;
