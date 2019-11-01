const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
      required: true,
      validate(val) {
          if(val<0){
              throw new Error("Age must be a positive number")
          }
      }
    },
    tokens: [{
        token:{
            type: String,
            required: true,
        }
    }]
})

//Creating custom method for schema to use in login process.
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user){
        throw new Error("Login failed. Bad credentials !")
    }
    
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Login failed. Bad credentials !')
    }
    return user

}

//old syntax bc "this"
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id : user._id.toString() }, 's3Cr3td0cum3nt_')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
    

}

//Hashing the password before saving
userSchema.pre('save', async function (next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User
