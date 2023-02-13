const Card = require('../../models/Card')
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  const user = req.User
  const card = new Card({ ...req.body, user: user._id })
  const verifyDoubleCard = await (await Card.find({ user: user._id }))
    .some(item => item.number == req.body.number)
  if (verifyDoubleCard) {
    res.status(409).json({ error: 'Este cartao ja esta registrado' })
  } else {
    try {
      await card.save()
      res.status(200).json({ card })
    } catch (e) {
      res.status(500).json({ error: 'Internal Error' })
    }
  }
}

const getAllCards = async (req, res) => {
  const user = req.User
  const cards = await Card.find({ user: user._id })
  res.status(200).json(cards)
}




module.exports = {
  create,
  getAllCards,
}