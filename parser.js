"use strict"
const fs = require('fs')

class Person {
  constructor(id,first_name,last_name,email,phone,created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at || new Date().toISOString()
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._arrFile = this.readFile().split('\n')
    this._people = []
  }

  get people() {
    return this._people
  }

  readFile() {
    return fs.readFileSync(this._file, 'utf8')
  }

  makeList() {
    for (let i = 1; i < this._arrFile.length; i++) {
      this._people.push(new Person(this._arrFile[i].split(',')))
    }
  }

  addPerson(input) {
    this._people.push(input)
  }

  save() {
    let result = this._arrFile[0]
    for (let i = 0; i < this._people.length; i++) {
      result += '\n' + Object.values(this._people[i])
    }
    fs.writeFileSync(this._file, result , 'utf8')
  }
}

let parser = new PersonParser('people.csv')
parser.makeList()
parser.addPerson(new Person('201','Zia','Nabilah','Zia@mail.com','0811222'))
parser.addPerson(new Person('202','Vene','Cia','Cia@mail.com','0811222'))
parser.save()
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
