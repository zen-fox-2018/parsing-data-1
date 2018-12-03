"use strict"
const fs = require('fs');



class Person  {
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}


class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.dataFile()
  }

  dataFile () {
    const file = fs.readFileSync('./people.csv', "utf8");
    let data = file.split(/\n/)
    let input = []
    let result = []
    for(let i = 0; i < data.length; i++) {
      input.push(data[i].split(','))
    }
    for(let i = 1; i < input.length; i++) {
      let obj = new Person (input[i][0], input[i][1], input[i][2], input[i][3], input[i][4], input[i][5], input[i][6] )
      result.push(obj)   
    }
    return result
  }

  get people() {
    return this._people
  }

  set people (input) {
    this._people.push(input)
  }

  addPerson(input) {
    this.people = input
  }



  save () {
    let input = ''
    input += Object.keys(this.people[0]).join() + "\n"
    for (let i = 0; i < this.people.length; i++) {
      input += Object.values(this.people[i])+ "\n"
    } 
    fs.writeFileSync('./people.csv', input)
  }
  


}


let parser = new PersonParser('./people.csv')
parser.addPerson(new Person('101', 'Sasa', 'A', 'sasa.com', '098765', 'asdfghj'))
parser.save()
console.log(parser.people)