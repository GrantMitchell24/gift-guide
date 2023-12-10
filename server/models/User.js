const { Schema, model } = require('mongoose');
const itemSchema = require("./Item")
const bcrypt = require("bcrypt")



const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
    required: [true, 'User email address required']
  },
  password: {
    type: String,
    required: [true, 'Password required']
  },
  name: {
    type: String,
    required: [true, 'Name required'],
    unique: false,
  },
  username: {
    type: String,
    required: [true, 'Username required'],
    unique: true,
  },
  items: [itemSchema],
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group',
  }],
  pending_groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group',
  }]
}, {
  timestamps: true
},
{
  toJSON: {
    virtuals: true,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// when we query a user, we'll also get another field called `groupCount` with the number of saved Groups we are a part of
userSchema.virtual('groupCount').get(function () {
  return this.groups.length;
});
// when we query a user, we'll also get another field called `itemCount` with the number of saved Item we have
userSchema.virtual('itemCount').get(function () {
  return this.items.length;
});

const User = model('User', userSchema);
module.exports = User;
