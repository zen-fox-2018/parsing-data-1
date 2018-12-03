"use strict"
const fs = require("fs");

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phone, created_at) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.createdAt = created_at;
  }

}

class PersonParser {

  constructor(file) {
    this._file = file;
    this.dataRaw = this.readFile()
    this._people = []
    this.parsing()
    this.addPerson()
    this.save()
  }
  
  get people() {
    return this._people
  }

  set people(input) {
    this.people.push(input)
  }

  readFile() {
    return fs.readFileSync(this._file, "utf-8").split("\n");
  }

  parsing() {
    let data = this.dataRaw
    let dataFinal = []
    for (let i = 1; i <= data.length-1; i++) {
      dataFinal.push(data[i].split(","))
    }
    for (let i = 0; i <= dataFinal.length-1; i++) {
      let thePerson = new Person(dataFinal[i][0], dataFinal[i][1], dataFinal[i][2], dataFinal[i][3], dataFinal[i][4], dataFinal[i][5]);
      this.people = thePerson;
    }
    return this.people
  }

  addPerson() {
    let newPerson = new Person("201", "celyn", "susanto", "abcd@gmail.com", '1-187-134-2333', '1-111-111-3333')
    this.people.push(newPerson)
  }

  save() {
    let data = this.people
    let dataString = ""
    for (let i = 0; i <= data.length-1; i++) {
      let string = ""
      for (let j in data[i]){
        string += data[i][j] 
        if (j != "createdAt") {
          string += ","
        }
      }
      if (i === 0) {
        dataString += "id,first_name,last_name,email,phone,created_at"
      }
      if (i != data.length-1) {
        string += "\n";
      }
      dataString += string
    }
    fs.writeFileSync("./people.csv", dataString);
  }

}

const parser = new PersonParser("./people.csv");
console.log(parser.people)
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
