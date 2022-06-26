const express = require('express')
const volleyball = require('volleyball')
const auth = require('./auth')
const payments = require('./payments/payments')

const app = express()

app.use(express.json())
app.use(volleyball)
app.use('/', auth)
app.use('/', payments)

const port = 8000
app.listen(port, () => {
  console.log(`App started on port ${port}`)
})
