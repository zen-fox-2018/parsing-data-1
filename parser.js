"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(data) {
    this.id = data.id,
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
    this._people = this.parsing()
    // console.log(this.people.length, '===========================')
  }

  readFile(file) {
    return fs.readFileSync(file, 'utf8').split('\n')
  }

  parsing() {
    let arr = this.readFile(this._file)
    let temp = []
    let result = []
    arr.forEach(e => temp.push(e.split(',')))
    console.log(temp[0])
    temp.forEach((e, i) => {
      if (i >= 0) {
        let data = {
          id: e[0],
          first_name: e[1],
          last_name: e[2],
          email: e[3],
          phone: e[4],
          created_at: e[5]
        }
        result.push(new Person(data))
      }
    });
    return result
  }

  get people() {
    return this._people
  }

  get file() {
    return this._file
  }

  addPerson(dataPerson) {
    this.people.push(dataPerson)
    console.log('Successfully add person');
  }

  save() {
    let result = []
    // console.log(this.people, ' ========')
    this.people.forEach(obj => {
      let str = []
      for (const key in obj) {
        str.push(obj[key])
      }
      result.push(str.join(','))
    });
    fs.writeFileSync(this.file, result.join('\n'))
    
    console.log('Successfully save data');
  }

}

let parser = new PersonParser('people.csv')

console.log(`There are ${parser.people.length-1} people in the file '${parser.file}'.`)
// console.log(parser._people);
console.log(parser.people.length+1, '==============');
let person1 = {
  id: parser.people.length,
  first_name: 'Bintang',
  last_name: 'Obien',
  email: 'bintang.obien@gmail.com',
  phone: '081637284591',
  created_at: JSON.stringify(new Date())
}

parser.addPerson(new Person(person1));
parser.save()
