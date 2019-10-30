const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})


const User = mongoose.model('User', {
    name: { 
      type: String,
      required: true,
      trim: true,
    }, 
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error ("Invalid Email")
            }
        }
    },
    age: {
      type: Number,
      validate(val) {
          if(val<0){
              throw new Error("Age must be a positive number")
          }
      }
    }
})

const me = new User({
    name: 'Mutluhan',
    email: "myemail@qwerqewr.com             ",
    age: 20
})

me.save().then(() => {
    console.log("saved");
}).catch((error) => {
    console.log("error occured :",error);
    
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

/*testTask.save().then(() => {
    console.log("saved");
}).catch((error) =>{
    console.log("error occured" , error);
    
})*/

