"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this._id = id
    this._firstName = first_name
    this._lastName = last_name
    this._email = email
    this._phone = phone
    this._createdAt = new Date(created_at)
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    return this._people
  }

  readFile() {
    let data = fs.readFileSync(this._file, 'utf8').split('\n')
    return data
  }

  parsing() {
    for(let i = 1; i < this.readFile().length; i++) {
      this._people.push(this.readFile()[i].split(','))
    }
  }
  
  addPerson(data) {
    this._people.push(data)
  }
  
  save() {
    let newData = ''
    for(let i = 0; i < this._people.length; i++) {
      newData += Object.values(this.people[i]).join(',') + '\n'
    }
    fs.writeFileSync('newPeople.csv', newData)
  } 
}

let parser = new PersonParser('people.csv')
parser.readFile()
parser.parsing()

let januar = new Person('201', 'Januar', 'Smad', 'janaursmad@mail.com', '081234567890', new Date())
let elis = new Person('202', 'Elis', 'Pao', 'elispao@mail.com', '081234567890', new Date())
parser.addPerson(januar)
parser.addPerson(elis)
parser.save()
console.log(`There are ${parser.people.length} people in the file ${parser.file}`)
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

// console.log(parser)