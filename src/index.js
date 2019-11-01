const express = require('express')
const userRouters = require('./routers/userRouters')
const taskRouters = require('./routers/taskRouters')
require("./db/mongoose")

const User = require("./models/user")
const Task = require("./models/task")

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouters)
app.use(taskRouters)



app.listen(port, () => {
  console.log("Server is up on port : " + port)
})

const bcrypt = require('bcrypt')

const myFunc = async () => {
  console.log("myfunc")
  const password = "qwer1234"
  const hashedPass = await bcrypt.hash(password, 8)
  console.log(password)
  console.log(hashedPass)
  const isMatch = await bcrypt.compare("qwer1234",hashedPass)
  console.log(isMatch)
  console.log("myfunc out")
}

myFunc()