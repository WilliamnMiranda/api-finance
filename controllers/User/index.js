const User = require('../../models/User')
const jwt = require("jsonwebtoken");
const Wallet = require('../../models/Wallet');
const register = async (req, res) => {
  const { name, last_name, email, cpf, password } = req.body
  const wallet = new Wallet()
  const user = new User({ name, email, password, cpf, last_name,wallet:wallet._id})
  try {
    await user.save();
    await wallet.save()
    const userLogged = { name, email, cpf, last_name,wallet }
    const token = jwt.sign({ cpf }, process.env.SECRET, {
      expiresIn: 300000000,
    });
    res.status(200).json({ ...userLogged, token });
  } catch (error) {
    res.status(500).json({error: 'Email ja cadastrado'})
  }
}

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email: email }).populate('wallet')
  if (!user) {
    res.status(404).json({ error: 'Usuario nao encontrado' })
  } else {
    if (await user.comparePassword(password)) {
      const { name, email, last_name, cpf, _id,wallet } = user;
      const token = jwt.sign({ cpf }, process.env.SECRET, {
        expiresIn: 300000000,
      });
      const userLogged = { name, email, last_name, cpf, _id,wallet }
      res.status(200).json({ ...userLogged, token })
    }
    else
      res.status(400).json({ error: 'senha incorreta' })
  }
}
const auth = async (req, res) => {
  const { name, email, cpf, last_name } = req.User
  const wallet = await Wallet.findById(req.User.wallet)
  res.status(200).json({ name, email, cpf, last_name,wallet })
}

module.exports = {
  register,
  login,
  auth,
}