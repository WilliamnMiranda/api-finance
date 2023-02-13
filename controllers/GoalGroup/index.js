const GoalGroup = require('../../models/GoalGroup')
const confirmAuth = require('../../utils/confirmAuth');

const create = async (req, res) => {
  const user = req.User
  const goalGroup = new GoalGroup({ ...req.body })
  try {
    goalGroup.users.push(user._id)
    goalGroup.users.push('457ac02529fc03426265dc21')
    await goalGroup.save()
    res.status(200).json(goalGroup)
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' })
  }
}


const getAll = async (req, res) => {
  const user = req.User
  const goals = await GoalGroup.find(
    { users: user }
  )
  res.status(200).json(goals)
}


module.exports = {
  create,
  getAll
}