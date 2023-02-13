const Transaction = require('../../models/Transaction')
const moment = require('moment')
moment.locale('pt')
moment.updateLocale('pt', {
  months: [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ]
});
const getCountTransactionsType = async (req, res) => {
  const data = await Transaction.aggregate([
    {
      $match: {
        $expr: {
          $and: [{
            $eq: [
              { $month: "$created_at" }, Number(req.query.month)
            ]
          }, {
            user: req.User,
          },
          {
            $eq: [
              { $year: "$created_at" }, Number(req.query.year)
            ]
          }]
        }
      }
    },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
        soma: { $max: '$value' },
      }
    },
  ])
  console.log(data)
  res.status(200).json({ data })
}


const getTransactionByGroupDate = async (req, res) => {
  const data = await Transaction.aggregate([
    {
      $match: {
        $expr: {
          $and: [{
            $eq: [
              { $month: "$created_at" }, Number(req.query.month)
            ]
          }, {
            user: req.User,
          },
          {
            $eq: [
              { $year: "$created_at" }, Number(req.query.year)
            ]
          }]
        }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: "%d-%m",
            date: "$created_at"
          }
        },
        data: { $push: '$$ROOT' },
      }
    },
    { $sort: { _id: -1 } }
  ])
  console.log(data)
  res.status(200).json({ data })
}

const getByMonth = async (req, res) => {
  const data = await Transaction.find(
    {
      user: req.User._id,
      $expr: {
        $eq: [
          { $month: "$created_at" }, req.params.mes
        ]
      }
    }
  )
  res.status(200).json(data)
}


const getValuesLastMonths = async (month, id, currentYear) => {
  const data = await Transaction.find(
    {
      user: id,
      $expr: {
        $eq: [
          { $month: "$created_at" }, month
        ],
      }
    }
    ,
    {
      value: 1,
      type: 1,
    }
  )
  return data
}

const getSumItem = (data) => {
  const expenses = data.filter((item) => item.type === 'Expense')
  const deposits = data.filter((item) => item.type === 'Deposit')
  const sumItemsExpense = expenses.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );
  const sumItemsDeposits = deposits.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );
  return {
    sumItemsExpense,
    sumItemsDeposits
  }
}

const getByLastMonths = async (req, res) => {
  let valuesAndMonths = []
  let currentMonth = new Date().getMonth() + 1
  let currentYear = new Date().getFullYear()
  for (let i = 1; i <= 8; i++) {
    if (currentMonth == 1) {
      currentMonth = 12
      const data = await getValuesLastMonths(1, req.User._id, currentYear)
      const { sumItemsExpense, sumItemsDeposits } = getSumItem(data)
      valuesAndMonths.push({
        month: 1,
        sumItemsExpense,
        sumItemsDeposits
      })
      currentYear -= 1
      continue
    } else {
      const data = await getValuesLastMonths(currentMonth, req.User._id, currentYear)
      const { sumItemsExpense, sumItemsDeposits } = getSumItem(data)
      valuesAndMonths.push({
        month: currentMonth,
        sumItemsExpense,
        sumItemsDeposits
      })
    }
    currentMonth -= 1
  }
  res.status(200).json(valuesAndMonths)
}

module.exports = {
  getCountTransactionsType,
  getByMonth,
  getTransactionByGroupDate,
  getByLastMonths
}
