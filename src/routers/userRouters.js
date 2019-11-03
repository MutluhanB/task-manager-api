const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')


router.get('/users/me', auth, async (req,res) => {
  const user = req.user
  res.send(await user.getPublicProfile()) //reg.user created @auth step
   
  })


  router.post('/login', async(req, res) =>{
    try {
      const password = req.body.password
      const email = req.body.email
      const user = await User.findByCredentials(email, password)
      const token = await user.generateAuthToken() //not User ! 'u'ser with lowercase
      res.send({user: await user.getPublicProfile(), token})
    } catch (error) {
      res.status(400).send(error)
    }
  }) 
  
  router.post('/logout', auth, async(req, res) =>{
    try {
      req.user.tokens = req.user.tokens.filter((tokenObject) => {
        return req.token !== tokenObject.token
      })
      await req.user.save()
      res.status(200).send()
    } catch (error) {
      res.status(500).send()
    }

  })

  
  //create new user
  router.post('/users', async (req,res)=>{
    const user = new User(req.body)
  
    try {
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({ user, token})
    } catch (error) {
      res.status(400).send(error)
    }
  
  })
  
  router.patch('/users/me', auth, async(req, res) =>{
    const validUpdates = ['name', 'email', 'password', 'age']
    const updates = Object.keys(req.body)
    const isValidUpdate = updates.every((update)=>{
      return validUpdates.includes(update)
    })
    if(!isValidUpdate){
      return res.status(400).send({error: "invalid update !  "})
    }
  
    try {
      
      const user = req.user
      updates.forEach((update) => {
        user[update] = req.body[update]
      })

      await user.save()
      
  
      res.send(user)
    } catch (error) {
      res.status(400).send(error)
      
    }
  
  })
  

router.delete('/users/me', auth, async(req, res) => {
    try {
      await req.user.remove()
      res.send(req.user)
    } catch (error)  {
      res.status(500).send()
    }
  })
  
  
module.exports = router