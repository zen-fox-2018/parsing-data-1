"use strict"
const fs = require(`fs`)

class Person {
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
    this._people = this.parsePeople(this._file)
  }

  get people() {
    return this._people
  }

  addPerson(personObj) { 
    this._people.push(personObj)
  }

  parsePeople(csv) {
    let stringData = fs.readFileSync(`${csv}`, `utf8`)
    stringData = stringData.split(`\n`)

    for (let i = 0; i < stringData.length; i++) {
      stringData[i] = stringData[i].split(`,`)
      stringData[i] = new Person(stringData[i][0], stringData[i][1], stringData[i][2], stringData[i][3], stringData[i][4], stringData[i][5])
    }
    stringData = stringData.slice(1)
    return stringData
  }
}

let parser = new PersonParser('people.csv')
console.log(parser.addPerson(new Person(`2`,`Taqi`, `Aziz`, `taqi@mail.com`, `087782387703`, new Date().toISOString())));
console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`)


