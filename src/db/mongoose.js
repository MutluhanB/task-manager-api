const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})


const User = mongoose.model('User', {
    name: { 
      type: String   
    },
    age: {
      type: Number
    }
})

const me = new User({
    name: 'Mutluhan',
    age: 20
})


const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const testTask = new Task({
    description: "test desc",
    completed: false,
})

testTask.save().then(() => {
    console.log("saved");
}).catch((error) =>{
    console.log("error occured" , error);
    
})

