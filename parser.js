"use strict"

var fs = require('fs')

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
    this.parserPeople()
  }

  get people() {
    return this._people
  }


  addPerson(data) {
    this._people.push(data)
  }


  parserPeople() {
    let input = fs.readFileSync(`./people.csv`, `utf8`).split(`\n`)

    for (let i = 0; i < input.length; i++) {
      input[i] = input[i].split(`,`)
      this._people.push(new Person(input[i][0], input[i][1], input[i][2], input[i][3], input[i][4], input[i][5]))
    }
  }

  save() {
    let forSave = []
    // console.log(Object.values(this.people[0]).join());
    for (let i = 0; i < this._people.length; i++) {
      forSave.push(Object.values(this.people[i]).join(','))
    }

    let hasil = forSave.join('\n')

    fs.writeFileSync(this._file, hasil)
  }


}

let parser = new PersonParser('people.csv')

parser.addPerson(new Person(parser.people.length,'Rachmad Zaini', 'Alberto', 'razato.zai@gmail.com', '085380031991', new Date().toISOString()))
parser.addPerson(new Person(parser.people.length,'Kirigaya', 'Kazuto', 'kirito.zai@gmail.com', '085380031991', new Date().toISOString()))
parser.save()
console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`)



