const mongoose = require('mongoose')
const validator = require('validator')

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
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')){
                throw new Error ("Password can not contain the word 'password' ")
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

module.exports = User
