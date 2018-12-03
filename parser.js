"use strict"

const fs = require("fs");

class Person {
  constructor(id, firstName, lastName, email, phone, createdAt) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._phone = phone;
    this._createdAt = createdAt;
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

  addPerson() {
    // console.log(parser.people)
  }

  readFile() {
    let data = fs.readFileSync(this._file, "utf8").split("\n");
    return data
  }

  writeFile(data) {
    let addData = fs.writeFileSync(this._file, data);
    return addData;
  }
  
  parsing() {
    let read = this.readFile();
    let sliced = read.slice(1);
    for(let i = 0; i < sliced.length; i++) {
      let splitted = sliced[i].split(",")
      let parsed = new Person(splitted[0], splitted[1], splitted[2], splitted[3], splitted[4], splitted[5])
      this._people.push(parsed);
    }
    // console.log(this._people);
  }
}

let parser = new PersonParser('people.csv')
parser.parsing()
parser.addPerson()
// console.log(parser.people)
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
