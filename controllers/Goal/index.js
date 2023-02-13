const Goal = require('../../models/Goal');
const { findById } = require('../../models/User');
const confirmAuth = require('../../utils/confirmAuth');

const create = async (req, res) => {
  const user = req.User
  const goal = new Goal({ ...req.body, user: user._id })
  try {
    await goal.save()
    res.status(200).json(goal)
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

const get = async (req, res) => {
  const user = req.User
  try {
    const goal = await Goal.find({ user: user._id })
    res.status(200).json(goal)
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' })
  }

}

const getOne = async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (goal) {
    if (confirmAuth(goal.user._id, req.User._id)) res.status(200).json(goal)
    else res.status(500).json({ error: 'Could not find' })
  }
  else {
    res.status(500).json({ error: 'note does not exist in the system' })
  }
}

const update = async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  goal.$set({
    ...goal,
    ...req.body
  })
  await goal.save()
  res.status(200).json(goal)
}


const deleteGoal = async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if (goal) {
    if (confirmAuth(goal.user._id, req.User._id)) {
      const goal = await Goal.findByIdAndDelete(req.params.id)
      res.status(200).json(goal)
    }
    else res.status(500).json({ error: 'it is not possible to delete this expense' })
  } else {
    res.status(500).json({ error: 'note does not exist in the system' })
  }
}


module.exports = {
  create,
  get,
  getOne,
  deleteGoal,
  update
}