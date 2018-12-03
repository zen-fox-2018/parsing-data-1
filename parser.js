"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  // id,first_name,last_name,email,phone,created_at
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
    this._rawData = fs.readFileSync(file, 'utf8')
    this._people = this.changeData()

    }

  get file() {
    return this._file
  }

  changeData() {
    const dataPerson = this._rawData.split('\n').map(a => a.split(','))
    // console.log(dataPerson);
    let output = []
    for (let i = 0 ; i < dataPerson.length ; i++) {
      // console.log(this.file[i]);
      let data = dataPerson[i]
      data[5] = String(new Date(data[5])) // RELEASE 2
      let obj = new Person(data[0], data[1], data[2], data[3], data[4], data[5])
      output.push(obj)
    }

    return output
  }

  get people() {
    return this._people
  }

  set people(array) {
    this._people.push(array)
  }

  addPerson(input) {
    input.created_at = String(new Date())
    this.people = input
  }

  save() {
    let output = ''
    for (let i = 0 ; i < this.people.length ; i++) {
      if (this.people[i].first_name !== undefined) {
        let array = Object.values(this.people[i])
        output += array.join(',') + '\n'
      }
    }
    fs.writeFileSync(this.file, output)
  }

}

let parser = new PersonParser('./people.csv')

parser.addPerson(new Person('250', 'Alfian', 'Syah', 'alfiansyah@gmail.com' , '08765432123', 'now'))
parser.addPerson(new Person('999', 'Rahman', 'Hasri', 'rahman.hasri@gmail.com' , '08562449977', 'now'))
parser.save()
