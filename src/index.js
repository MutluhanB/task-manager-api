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

const main = async() =>{
  // const task = await Task.findById('5dbecc75911f8233cccac699')
  // await task.populate('owner').execPopulate()
  // console.log(task.owner)

  const user = await User.findById('5dbec850202bbb2a4fcf4aa3')
  await user.populate('tasks').execPopulate()
  console.log(user.tasks)  


}

main()
