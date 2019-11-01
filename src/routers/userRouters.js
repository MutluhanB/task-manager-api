const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')


router.get('/users/me', auth, async (req,res) => {

  res.send(req.user) //reg.user created @auth step
   
  })


  router.post('/login', async(req, res) =>{
    try {
      const password = req.body.password
      const email = req.body.email
      const user = await User.findByCredentials(email, password)
      const token = await user.generateAuthToken() //not User ! 'u'ser with lowercase
      res.send({user, token})
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
      res.send()
    } catch (error) {
      res.status(500).send()
    }

  })
  router.get('/users/:id' , async (req,res)  => {
    const ID = req.params.id
    try {
      const user = await User.findById(ID)
      if (!user) {
        return res.status(404).send()
      }
      return res.send(user)
    } catch (error) {
      res.status(500).send()
    }
  
  })
  
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
  
  router.patch('/users/:id', async(req, res) =>{
  
    const validUpdates = ['name', 'email', 'password', 'age']
    const updates = Object.keys(req.body)
    const isValidUpdate = updates.every((update)=>{
      return validUpdates.includes(update)
    })
    if(!isValidUpdate){
      return res.status(400).send({error: "invalid update !  "})
    }
  
    try {
      const ID  = req.params.id
      const user = await User.findById(ID)
      
      updates.forEach((update) => {
        user[update] = req.body[update]
      })

      await user.save()
      
      if(!user){
        return res.status(404).send()
      }
  
      res.send(user)
    } catch (error) {
      res.status(400).send(error)
      
    }
  
  })
  

router.delete('/users/:id', async(req, res) => {
    try {
      const ID = req.params.id
      const user = await User.findByIdAndDelete(ID)
      if (!user) {
        return res.status(404).send({error: "user not found for given ID"+ ID}) 
      }
      res.send(user)
    } catch (error)  {
      res.status(500).send()
    }
  })
  
  
module.exports = router