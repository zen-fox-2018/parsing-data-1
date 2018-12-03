"use strict"

const fs = require("fs");

class Person {
  constructor(id, firstName, lastName, email, phone, createdAt) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._phone = phone;
    this._createdAt = new Date(createdAt).toISOString();
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

  addPerson(data) {
    parser.people.push(data)
  }

  readFile() {
    let data = fs.readFileSync(this._file, "utf8").split("\n");
    return data
  }

  appendFile(data) {
    let addData = fs.appendFileSync(this._file, data, "utf8");

    return addData
  }
  
  parsing() {
    let read = this.readFile();
    let sliced = read.slice(1);
    for(let i = 0; i < sliced.length; i++) {
      let splitted = sliced[i].split(",")
      let parsed = new Person(splitted[0], splitted[1], splitted[2], splitted[3], splitted[4], splitted[5])
      this._people.push(parsed);
    }
  }

  save() {
    let addPerson = "";
    for(let i = 0; i < this._people.length; i++) {
      addPerson += `${this._people[i]._id},${this._people[i]._firstName},${this._people[i]._lastName},${this._people[i]._email},${this._people[i]._phone},${this._people[i]._createdAt}`
    }
    this.appendFile(addPerson)
  }
}

let parser = new PersonParser('people.csv')
parser.addPerson(new Person(201, "luna", "freya", "lunafreya@mail.com", "0897654679", new Date()));
// parser.parsing()
parser.save()
// console.log(parser.people)
// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
