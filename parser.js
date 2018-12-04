"use strict"
const fs = require("fs")
class Person {
  constructor(id,firstname,lastname,email,phone,create) {
    this._id = id;
    this.first_name = firstname;
    this.last_name = lastname;
    this.email = email;
    this.phone = phone;
    this.createdAt = create || new Date().toISOString() ;
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {
  
  constructor(file) {
    this._file = file
    this._rawData = this.readData()
    this._people = []
  }
  
  get people () {
    return this._people
  }
  get file () {
    return this._file
  }
  readData () {
    let file = fs.readFileSync(this._file,"utf8").split('\n')
    return file
  }
  parsing() {
    let file = this._rawData
    for (let i = 1 ; i < file.length ; i++) {
      let newData = file[i].split(",") 
      let people = new Person(newData[0],newData[1],newData[2],newData[3],newData[4],newData[5])
      this.addPerson(people)
    }
  }
  addPerson (people) {
    this._people.push(people)
  }
  save () {
    let submit = this._rawData[0] + "\n"
    for (var i = 0 ; i < this.people.length ; i++) {
      let data = this.people[i]
      submit+= `${data._id},${data.first_name},${data.last_name},${data.email},${data.phone},${data.createdAt} \n`
    }
     fs.writeFileSync(this.file,submit)
  }
  
}

let parser = new PersonParser('people.csv')
let zia = new Person("201","fauzia","Nabilah","zia@gmail.com","021-876-112")
parser.parsing()
parser.addPerson(zia)
parser.save()
// console.log(parser.people)
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
