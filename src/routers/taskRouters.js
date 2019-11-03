const express = require('express')
const Task = require('../models/task')
const router = new express.Router()
const auth = require('../middleware/auth')


router.post('/tasks',auth, async (req, res) => {
   // const task = new Task(req.body)

   const task = new Task({
       ...req.body,
       owner: req.user._id
   })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }


})

router.get('/tasks',auth, async (req, res) => {
    try {
        const tasks = await Task.find({owner : req.user._id})
        res.send(tasks)

    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks/:id',auth, async (req, res) => {
    const ID = req.params.id
    try {
        const task = await Task.findOne({_id : ID, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})


router.delete("/tasks/:id",auth, async (req, res) => {
    try {
        const ID = req.params.id
        const task = await Task.findOneAndDelete({_id:ID, owner: req.user._id})
        if (!task) {
            return res.status(404).send({ error: "task not found for given ID " + ID })
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})




router.patch('/tasks/:id',auth, async (req, res) => {

    const validUpdates = ['description', 'completed']
    const updates = Object.keys(req.body)
    const isValidUpdate = updates.every((update) => {
        return validUpdates.includes(update)
    })

    if (!isValidUpdate) {
        return res.status(404).send({ error: "invalid update " })
    }
    try {
        const ID = req.params.id
        const task = await Task.findOne({_id:ID, owner: req.user._id})

        if (!task) {
            return res.status(404).send()
        }
        
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router