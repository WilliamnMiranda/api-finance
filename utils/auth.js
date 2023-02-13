const User = require("../models/User");
const jwt = require("jsonwebtoken");
const AuthenticateUser = async (req, res, next) => {
  const {token} = req.body
  if(!token) return res.status(500).json({error:'no token provider'})
  jwt.verify(token, process.env.SECRET, async function(err, decoded) {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token.' });
    req.User= await User.findOne({cpf:decoded.cpf});
    next()
  });
}

module.exports = AuthenticateUser;