//express setup
const express = require('express')
const app = express()
app.use(express.json()) //body parser

const randomId = require('shortid')

const port = 8000
let users = []

//end points
app.get('/', (req, res) => {
    res.status(200).send(users)
})

app.post('/api/users', (req, res) => {
    if (typeof req.body.name === 'undefined' || typeof req.body.bio === 'undefined') {
        res.status(400).send({ errorMessage: 'Please provide name and bio for user.' })
    }
    const newUser = {
        name: req.body.name,
        bio: req.body.bio,
        id: randomId()
    }
    users.push(newUser)
    res.status(201).send(newUser)
})

app.get('/api/users', (req, res) => {
    res.status(200).send(users)
})

app.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    const result = users.find(user => user.id === id)

    if (result) {
        res.status(200).send(result)
    } else {
        res.status(404).send({ message: 'The user with the specified ID does not exist' })
    }
})

//fall back error
app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id

    const user = users.find(usr => usr.id === id)

    if (user) {
        users = users.filter(us => us.id === id)
        res.status(204).send(users)
    } else {
        res.status(404).send({ message: 'The user with the specified ID does not exist.' })
    }

    //fallback error
    res.status(500).send({ errorMessage: 'The user could not be removed' })
})

app.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    if (typeof req.body.name === 'undefined' || typeof req.body.bio === 'undefined') {
        res.status(400).send({ errorMessage: 'Please provide name and bio for user.' })
    }
    const found = users.find(usr => usr.id === id)
    if (!found) {
        res.status(404).send({ message: 'The user with the specified ID does not exist' })
    } else {
        Object.assign(found, req.body)
        res.status(201).json(found)
    }

    //fallback error
    res.status(500).send({ errorMessage: 'The user could not be modified' })
})






app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})