const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
      
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        const decoded = jwt.verify(token, 's3Cr3td0cum3nt_')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if(!user){
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({error: "UNAUTHORIZED !"})
    }

}

module.exports = auth