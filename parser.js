"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
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

  set people(obj) {
    this._people.push(obj)
  }

  readFile() {
    return fs.readFileSync(this.file, 'utf-8').split('\n');
  }

  listPerson() {
    let listAnggotaSaja = this.readFile().slice(1)
    for (let i = 0; i < listAnggotaSaja.length; i++) {
      let splittedList = this.readFile()[i].split(',');
      let newPerson = new Person(splittedList[0], splittedList[1], splittedList[2], splittedList[3], splittedList[4], splittedList[5])
      this.people = newPerson
    }
    return this.listPerson
  }

  get file() {
    return this._file
  }

  addPerson(id, first_name, last_name, email, phone, created_at) {
    let personAdded = new Person(id, first_name, last_name, email, phone, created_at)
    this.people = personAdded
  }

  personAdded(people) {
    let added = this.addPerson(id, first_name, last_name, email, phone, created_at)
    let hasAdded = []
    hasAdded.push(added)
  }

  save() {
    let readyToWriteInCSV = []
    for (let i = 0; i < this.people.length; i++) {
      readyToWriteInCSV.push(Object.values(this.people[i]).join(','))
    }
    fs.writeFileSync(this.file, readyToWriteInCSV.join('\n'))
  }
}

let parser = new PersonParser('./people.csv')
console.log(parser.listPerson())
console.log(parser.people);
parser.addPerson(201, 'Mahdi', 'Haris', 'haha@quam.com', '1-633-389-7173', '2012-05-10T03:55:40-08:00')
console.log(parser.save());
parser.addPerson(202, 'Haha', 'Hihi', 'haha@quam.com', '1-633-389-7173', '2012-05-10T03:55:40-08:00')
console.log(parser.save());
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)



