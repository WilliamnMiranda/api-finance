const Transaction = require('../../models/Transaction')
const confirmAuth = require('../../utils/confirmAuth');

const create = async (req, res) => {
  const user = req.User
  const deposit = new Transaction({ ...req.body, user: user._id })
  try {
    await deposit.save()
    res.status(200).json(deposit)
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

const get = async (req, res) => {
  const user = req.User
  try {
    const deposit = await Transaction.find({ user: user._id })
    res.status(200).json(deposit)
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

const getLast = async (req, res) => {
  const user = req.User
  try {
    const deposit = await Transaction.find({ user: user._id }).sort({ created_at: -1 }).limit(10)
    res.status(200).json(deposit)
  } catch (e) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

const getOne = async (req, res) => {
  const deposit = await Transaction.findById(req.params.id)
  if (deposit) {
    if (confirmAuth(deposit.user._id, req.User._id)) res.status(200).json(deposit)
    else res.status(500).json({ error: 'Could not find' })
  } else {
    res.status(500).json({ error: 'note does not exist in the system' })
  }
}

const getByType = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.User, type: req.body.type })
    res.status(200).json({ transactions })
  } catch (e) {
    res.status(500).json({ error: 'internal server error' })
  }
}

const getByTypeAndCurrentMonth = async (req, res) => {
  const currentDate = new Date().getMonth() + 1
  const data = await Transaction.find(
    {
      user: req.User._id,
      $expr: {
        $eq: [
          { $month: "$created_at" }, currentDate
        ]
      }
    }
  )
  const expenses = data.filter((item) => item.type.toLowerCase() === 'expense')
    .reduce((accumulator, currentValue) => currentValue.value += accumulator, 0)
  const deposits = data.filter((item) => item.type.toLowerCase() === 'deposit')
    .reduce((accumulator, currentValue) => currentValue.value += accumulator, 0)
  console.log(expenses)
  res.status(200).json({
    expenses,
    deposits
  })
}


const deleteDeposit = async (req, res) => {
  const deposit = await Transaction.findById(req.params.id)
  if (deposit) {
    if (confirmAuth(deposit.user._id, req.User._id)) {
      const deposit = await Transaction.findByIdAndDelete(req.params.id)
      res.status(200).json(deposit)
    }
    else res.status(500).json({ error: 'it is not possible to delete this deposit' })
  } else {
    res.status(500).json({ error: 'note does not exist in the system' })
  }
}

module.exports = {
  create,
  get,
  getOne,
  getByType,
  deleteDeposit,
  getLast,
  getByTypeAndCurrentMonth,
}
