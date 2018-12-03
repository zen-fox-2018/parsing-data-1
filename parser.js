"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(data) {
    this.id = parser.people.length,
    this.first_name = data.first_name,
    this.last_name = data.last_name,
    this.email = data.email,
    this.phone = data.phone,
    this.created_at = data.created_at
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = fs.readFileSync(file, 'utf8').split('\n')
  }

  get people() {
    return this._people
  }

  get file() {
    return this._file
  }

  addPerson(dataPerson) {
    // console.log(this._people);
    let result = []
    for (const data in dataPerson) {
      result.push(dataPerson[data])
    }
    this._people.push(result.join(','))
    console.log('Successfully add person');
  }

  save() {
    fs.writeFileSync(this._file, this._people.join('\n'))
    console.log('Successfully save data');
  }

}

// const file = fs.readFileSync('people.csv')

let parser = new PersonParser('people.csv')

// console.log(`There are ${parser.people.length-1} people in the file '${parser.file}'.`)
// console.log(parser._people);
// console.log(parser.people);
let person1 = {
  first_name: 'Bintang',
  last_name: 'Obien',
  email: 'bintang.obien@gmail.com',
  phone: '081637284591',
  created_at: new Date()
}

parser.addPerson(new Person(person1));
parser.save()
