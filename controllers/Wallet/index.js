const Wallet = require('../../models/Wallet')
 const addValue = async (req, res) => {
    const { value,walletId } = req.body
    try{
        const wallet = await Wallet.findById(walletId)
        wallet.value += value
        await wallet.save()
        res.status(200).json(wallet)
    }catch(e){
        res.status(500).json({error: 'Internal server error'})
    }
  }

  module.exports = {
    addValue
  }