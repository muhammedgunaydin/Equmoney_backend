const express = require('express')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const db = require('../db/connection')
const users = db.get('users')

users.createIndex('email', { unique: true })

const router = express.Router()

const schema = Joi.object({
  email: Joi.string().required().email(),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,15}$')).trim(),
})

router.get('/', (req, res) => {
  res
    .json({
      message: 'Success',
    })
    .status(200)
})

router.post('/signup', (req, res, next) => {
  const result = schema.validate(req.body)
  if (!result.hasOwnProperty('error')) {
    users
      .findOne({
        email: req.body.email,
      })
      .then((user) => {
        if (user) {
          const error = new Error('Bu email daha önceden kullanılmış')
          res.status(409)
          next(error)
        } else {
          // Şifre hashing
          bcrypt.hash(req.body.password.trim(), 12).then((hashedPassword) => {
            const newUser = {
              email: req.body.email,
              password: hashedPassword,
            }

            // Onaylananan kullanıcıyı ekleme
            users.insert(newUser).then((insertedUser) => {
              res.json({
                id: insertedUser._id,
                email: insertedUser.email,
              })
              next()
            })
          })
        }
      })
  } else {
    res.status(422)
    next(result.error)
  }
})

function respondError422(res, next) {
  res.status(422)
  const error = new Error('Unable to login.')
  next(error)
}

router.post('/login', (req, res, next) => {
  const result = schema.validate(req.body)
  if (!result.hasOwnProperty('error')) {
    users
      .findOne({
        email: req.body.email,
      })
      .then((user) => {
        if (user) {
          bcrypt.compare(req.body.password, user.password).then((result) => {
            if (result) {
              res.json({
                message: 'success',
                id: user._id,
              })
            } else {
              res.json({ status: 400 })
            }
          })
        } else {
          res.json({ status: 400 })
        }
      })
  } else {
    res.json({ status: 400 })
  }
})

module.exports = router
