"use strict"
const fs = require('fs')
class Person {
  constructor(id,firstName,lastName,email,phone,created){
    this.id = id;
    this.first_name = firstName;
    this.last_name = lastName;
    this.email = email;
    this.phone = phone;
    this.created_at = created;
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [] 
  }

  set people(input) {
    this._people.push(input)
  }
  get people(){
    return this._people
  }

  get file () {
    return this._file
  }

  dataToArray(){
    return fs.readFileSync(this.file, 'utf-8')
  }

  readFile () {
    let dataArray =  this.dataToArray.split('\n')
    dataArray =  dataArray.slice(1)
    let splitted = ''
    
    for(let i = 0; i < dataArray.length; i++){
        dataArray[i] =  dataArray[i].split(',')
        splitted = new Person(dataArray[i][0],dataArray[i][1],dataArray[i][2],dataArray[i][3],dataArray[i][4],dataArray[i][5])
        this.people =  splitted
    }

   return this.readFile
  }

  
  addPerson(obj) {
    this._people.push(obj)
  }

  save(){
    let readyCovert = []
    for(let i = 0; i < this.people.length; i++){
      readyCovert.push(Object.values(this.people[i]).join(','))
    }
    fs.writeFileSync(this.file, readyCovert.join('\n'))
  }

}



let parser = new PersonParser('people.csv')
// let ibenk = {
//               firstName : 'ahmad',
//               lastName : 'syukron',
//               email : 'ahmad@gmail.com',
//               phone : '082202545896'
//             }


console.log(parser.readFile())
//console.log(parser)
parser.addPerson(new Person(220,'ahmad','syukron', 'ahmd@SpeechGrammarList.com', '082202545986', new Date));
console.log(parser.people)
console.log(parser.save())
console.log(`There are ${parser.people.length-1} people in the file '${parser.file}'.`)

