"use strict"

const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(newPersonSplit){
    this.id = newPersonSplit[0]
    this.first_name = newPersonSplit[1]
    this.last_name = newPersonSplit[2]
    this.email = newPersonSplit[3]
    this.phone = newPersonSplit[4]
    this.created_at = newPersonSplit[5]
  }
  
}

class PersonParser {

  constructor(file) {
    this._file = file
    this.readFile= this.read_file(file)
    this._people = this.people
  }

  read_file(file){
    return fs.readFileSync(file,'utf-8').split('\n')
  }

  get people() {
    this._people = []

    for( let i = 0; i< this.readFile.length; i++){
      this._people.push(new Person(this.readFile[i].split(',')))
    }

    return this._people
  }

  get file(){
    return this._file
  }

  addPerson(objPerson) {
    this._people.push(objPerson)
  }

  save(){
    let output=''
    let arrOutput =[]

    for(let i = 0; i< this._people.length; i++){
      for (let prop in this._people[i]){
        arrOutput.push(this._people[i][prop]) 
      }
      arrOutput.join(',')
      output+= arrOutput
      output+= "\n"
      arrOutput = []
    }

    return fs.writeFileSync(this.file, output)
  }

}

var parser = new PersonParser('./people.csv')
var date = new Date()
var newPerson = '201,Aditya,Respati,Aditya@hacktiv8.com,087654321,'+date

//run program
parser.addPerson(new Person(newPerson.split(',')))
parser.save()
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)

// console.log(parser._people[parser._people.length -1 ])
