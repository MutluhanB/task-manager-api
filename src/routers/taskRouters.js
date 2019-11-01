const express = require('express')
const Task = require('../models/task')
const router = new express.Router()



router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }


})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)

    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const ID = req.params.id
    try {
        const task = await Task.findById(ID)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})


router.delete("/tasks/:id", async (req, res) => {
    try {
        const ID = req.params.id
        const task = await Task.findByIdAndDelete(ID)
        if (!task) {
            return res.status(404).send({ error: "task not found for given ID " + ID })
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})




router.patch('/tasks/:id', async (req, res) => {
    console.log("qweqwe");

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
        const task = await Task.findById(ID)

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router