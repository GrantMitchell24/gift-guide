const { Schema, model } = require('mongoose');


const groupSchema = new Schema({
  group_members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  admin_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
  },
  pending_group_members: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]

}, {
  timestamps: true
});

const Group = model('Group', groupSchema);

module.exports = Group;

