const express = require('express')
const app = express()
require("dotenv").config();
const mongoose = require('mongoose');
const access = require('./routes/User')
const expense = require('./routes/Expense')
const card = require('./routes/Card')
const goal = require('./routes/Goal')
const goalGroup = require('./routes/GoalGroup')
const aggregation = require('./routes/aggregate')
const wallet = require('./routes/Wallet')
const transaction = require('./routes/Transaction')
const bodyParser = require("body-parser");
const cors = require('cors')
// connection db
const PORT = process.env.PORT || 8081
mongoose.connect(
  process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("conectado ao banco")
})

//middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
//routes
app.use('/access', access)
app.use('/expense', expense)
app.use('/card', card)
app.use('/transaction', transaction)
app.use('/goal', goal)
app.use('/wallet', wallet)
app.use('/aggregation', aggregation)
app.use('/goalgroup', goalGroup)
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})