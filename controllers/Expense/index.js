const Expense = require('../../models/Expense')
const confirmAuth = require('../../utils/confirmAuth');

const create = async (req, res) => {
  const user = req.User
  const expense = new Expense({ ...req.body,user: user._id })
  try{
    await expense.save()
    res.status(200).json(expense)
  }catch(e){
    res.status(500).json({error: 'Internal server error'})
  }
}

const get = async (req, res) => {
  const user = req.User
  try{
    const expenses = await Expense.find({user: user._id}).populate('card')
    res.status(200).json(expenses)
  }catch(e){
    res.status(500).json({error: 'Internal server error'})
  }

}

const getOne = async (req, res) => {
  const expense = await Expense.findById(req.params.id)
  if(expense){
     if(confirmAuth(expense.user._id,req.User._id)) res.status(200).json(expense)
     else res.status(500).json({error: 'Could not find'})
   }
  else{
    res.status(500).json({error: 'note does not exist in the system'})
   }
}

const deleteExpense = async (req, res) => {
  const expense = await Expense.findById(req.params.id)
  if(expense){
      if(confirmAuth(expense.user._id,req.User._id)){
        const expense = await Expense.findByIdAndDelete(req.params.id)
        res.status(200).json(expense)
      }
      else res.status(500).json({error: 'it is not possible to delete this expense'})
   }else{
    res.status(500).json({error: 'note does not exist in the system'})
   }
}



module.exports = {
  create,
  get,
  getOne,
  deleteExpense
}