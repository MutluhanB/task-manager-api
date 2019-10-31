const express = require('express')
const User = require('../models/user')
const router = new express.Router()



router.get('/users', async (req,res) => {

    try {
      const users = await User.find({})
      res.send(users)
    } catch (error) {
      res.status(500).send(error)
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
      res.status(201).send(user)
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
      const user = await User.findByIdAndUpdate(ID , req.body, {new: true, runValidators: true})
      if(!user){
        return res.status(404).send()
      }
  
      res.send(user)
    } catch (error) {
      res.status(400).send(e)
      
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