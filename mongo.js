const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const personToAdd = process.argv[3]
const numberToAdd = process.argv[4]

const url =
  `mongodb+srv://ristoml:${password}@fs-cluster0.zlj6uav.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  id: String
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: personToAdd,
  number: numberToAdd,
  id: '121314131'
})

if (personToAdd) {
  person.save().then(result => {
    console.log('person saved!')
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}
