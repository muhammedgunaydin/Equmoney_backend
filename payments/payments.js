const express = require('express')
const db = require('../db/connection')
const payments = db.get('payments')
const bankAccount = db.get('bank-account')
const router = express.Router()

// // ödemeleri db'den alan eden endpoint
router.get('/payments', (req, res) => {
  payments.find({ user_id: req.body._id }).then((payments) => {
    res.json({ payments: payments })
  })
})

router.get('/payments/:id', (req, res) => {
  payments.find({ user_id: req.params.id }).then((payments) => {
    res.json({ payments: payments })
  })
})

router.patch('/payments/:id', (req, res) => {
  payments
    .findOneAndUpdate({ uniq: +req.params.id }, { $set: req.body })
    .then((payment) => {
      res.json({ payment })
    })
})

// ödemeyi db'ye kayıt eden endpoint
router.post('/payments', (req, res) => {
  const amount = parseFloat(req.body.amount)
  if (amount == null) {
    res.json({ message: 'bad request ' }).status(400)
  } else {
    const newAmount = {
      uniq: req.body.uniq,
      user_id: req.body.user_id,
      name: req.body.name,
      amount: amount,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      paid: req.body.paid,
    }
    payments.insert(newAmount)
    res.json({ message: 'success ' }).status(201)
  }
})

// ödemeleri db'den silen endpoint
router.delete('/payments/:id', (req, res) => {
  const query = { uniq: +req.params.id }
  payments.remove(query)
  res.json({ message: 'data removed ' }).status(201)
})

// geliri db'ye kayıt eden endpoint
router.post('/bank-account', (req, res) => {
  const balance = parseFloat(req.body.balance)
  if (balance == null) {
    res.json({ message: 'bad request ' }).status(400)
  } else {
    bankAccount.findOne({ user_id: req.body.user_id }).then((account) => {
      if (account) {
        bankAccount
          .update(
            {
              user_id: account.user_id,
            },
            {
              $set: {
                balance: balance,
              },
            },
            { upsert: true }
          )
          .then(() => {
            res.json({ message: 'updated ' }).status(200)
          })
      } else {
        const newBankAccount = {
          user_id: req.body.user_id,
          balance: balance,
        }
        bankAccount.insert(newBankAccount)
        res.json({ message: 'created ' }).status(201)
      }
    })
  }
})

//bakiyeyi db'den getiren endpoint
router.get('/bank-account', (req, res) => {
  bankAccount.find({ user_id: req.body._id }).then((balance) => {
    res.json({ balance })
  })
})

router.patch('/bank-account/:id', (req, res) => {
  bankAccount
    .findOneAndUpdate({ user_id: req.params.id }, { $set: req.body })
    .then((balance) => {
      res.json({ balance })
    })
})

router.get('/bank-account/:id', (req, res) => {
  bankAccount.find({ user_id: req.params.id }).then((balance) => {
    res.json({ balance })
  })
})

// toplam ödemeyi ve gideri hesaplayan endpoint
router.get('/totalcalculate', async (req, res) => {
  let totalAmount = 0
  let rotBalance = 0
  const amount = await payments.find({ user_id: req.body._id })
  amount.map((value) => (totalAmount += value.amount))

  const balance = await bankAccount.find({ user_id: req.body._id })
  balance.map((value) => (rotBalance += value.balance))

  const newBalance = rotBalance - totalAmount

  res.json({ newBalance })
})

//tek ödemeyi ve gideri hesaplayan endpoint
router.get('/singlecalculate', async (req, res) => {
  let singleAmount = 0
  let rotBalance = 0
  const amount = await payments.find({ _id: req.body._id })
  amount.map((value) => (singleAmount += value.amount))

  const balance = await bankAccount.find({ user_id: req.body._id })
  balance.map((value) => (rotBalance += value.balance))

  const newBalance = rotBalance - singleAmount

  res.json({ newBalance })
})

//ödemeleri toplayan endpoint
router.get('/needcalculate/:id', async (req, res) => {
  let totalAmount = 0
  const amount = await payments.find({ user_id: req.params.id })
  amount.forEach((value) => {
    if (!value.paid) {
      totalAmount += value.amount
    }
  })
  res.json({ totalAmount })
})

module.exports = router
