const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('person', function (req, res) { return JSON.stringify(req.body) })
const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]

app.post('/api/persons', (req, res) => {
    
    const body = req.body
    
    if (!body.name) {
        return res.status(400).json({ error: 'name missing' })
    }
    if (!body.number) {
        return res.status(400).json({ error: 'number missing' })
    }
    if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({ error: 'name must be unique' })
    }

    const id = Math.floor(Math.random() * 1000)
    console.log(id)

    const person = req.body
    console.log(person)
    person.id = id

    persons = persons.concat(person)

    res.json(person)
})

app.get('/info', (req, res) => {
    res.send('Phonebook has info for ' + Object.keys(persons).length + ' people<br/>' + new Date().toString())

})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) res.json(person)
    else res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.send()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
