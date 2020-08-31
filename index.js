//express setup
const express = require('express')
const app = express()

const cors = require('cors')

app.use(express.json()) //body parser
app.use(cors())

const randomId = require('shortid')

const port = 8000
let users = [
    {
        id: "1",
        name: "First Name",
        bio: "Bio Message Here"
    },
    {
        id: "2",
        name: "Second Name",
        bio: "Second Message Here"
    }
]

//end points
app.get('/', (req, res) => {
    res.status(200).json(users)
})

app.post('/api/users', (req, res) => {
    if (req.body.name === '' || req.body.bio === '') {
        res.status(400).json({ message: 'Please provide name and bio for user.' })
    } else {
        const newUser = {
            name: req.body.name,
            bio: req.body.bio,
            id: randomId()
        }
        users.push(newUser)
        res.status(201).json(newUser)
    }
})

app.get('/api/users', (req, res) => {
    res.status(200).json(users)
})

app.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    const result = users.find(user => user.id === id)

    if (result) {
        res.status(200).json(result)
    } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist' })
    }
})

//fall back error
app.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    const user = users.find(usr => usr.id === id)
    if (user) {
        users = users.filter(us => us.id !== id)
        res.status(204).json(users).end()
    } else {
        res.status(404).json({ message: 'The user with the specified ID does not exist.' })
    }
    // console.log('fallback triggered')
    //fallback error
    // res.status(500).json({ errorMessage: 'The user could not be removed' })
})

app.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    if (req.body.name === '' || req.body.bio === '') {
        res.status(400).json({ message: 'Please provide name and bio for user.' })
    } else {
        const found = users.find(usr => usr.id === id)
        if (!found) {
            res.status(404).json({ message: 'The user with the specified ID does not exist' })
        } else {
            Object.assign(found, req.body)
            res.status(201).json(found)
        }
    }
})






app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})