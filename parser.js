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
    this._dataRaw = this.readFile()
    this._dataParse = this.parsing()
  }

  get file () {
    return this._file
  }

  get people () {
    return this._people
  }

  set people (data) {
    this._people.push(data)
  }

  get people () {
    return this._people
  }

  get dataRaw () {
    return this._dataRaw
  }

  readFile () {
    let data = fs.readFileSync(this.file, 'utf8').split('\n')
    return data
  }

  parsing () {
    for(let i = 1; i < this.dataRaw.length; i++) {
      this.people = this.dataRaw[i].split(',')
    }
  }
  
  addPerson (data) {
    this.people = data
  }
  
  save () {
    let newData = ''
    for(let i = 0; i < this.people.length; i++) {
      newData += Object.values(this.people[i]).join(',') + '\n'
    }
    fs.writeFileSync(this.file, newData)
  } 
}

let parser = new PersonParser('people.csv')

let januar = new Person('201', 'Januar', 'Smad', 'janaursmad@mail.com', '081234567890', new Date())
let elis = new Person('202', 'Elis', 'Pao', 'elispao@mail.com', '081234567890', new Date())
parser.addPerson(januar)
parser.addPerson(elis)
parser.save()
console.log(`There are ${parser.people.length} people in the file ${parser.file}`)