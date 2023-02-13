const mongoose = require('mongoose')
const GoalGroup = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  currentValue: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('GoalGroup', GoalGroup)
