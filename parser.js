"use strict"
const fs = require('fs')

class Person {
  constructor(id,first_name,last_name,email,phone,created_at) {
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
    this._people = this.parsePeople(file)
  }

  parsePeople(file) {
    let data = fs.readFileSync(file, 'utf8').split('\n')
    let result = []
    let dataArr = []
    for (let i = 1; i < data.length; i++) {
      dataArr = data[i].split(",")
      result.push(new Person(dataArr[0],dataArr[1],dataArr[2],dataArr[3],dataArr[4],dataArr[5]))
    }
    return result
  }

  get people() {
    return this._people
  }

  get file() {
    return this._file
  }

  addPerson(newPeople) {
    this._people.push(newPeople)
  }

  save() {
    let resultWrite = ""
    let result = ['id,first_name,last_name,email,phone,created_at']
    let data = this._people
    for (var i = 0; i < data.length; i++) {
      let temp = [data[i].id, data[i].first_name, data[i].last_name, data[i].email, data[i].phone, data[i].created_at]
      result.push(temp.join(","))
    }
    resultWrite = result.join('\n')
    fs.writeFileSync('./people.csv', resultWrite)
  }

}

let parser = new PersonParser('./people.csv')
parser.addPerson(new Person(201, 'Patria', 'Gani', 'patria.gani@gmail.com', '1-554-353-5053,2012-09-14T15:57:44-07:00'))
parser.save()

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
