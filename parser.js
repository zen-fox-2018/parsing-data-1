const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?

  constructor(id, firstname, lastname, email, phone, created_at) {
    this.id = id
    this.firstname = firstname
    this.lastname = lastname
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._data = this.readData()
    this._people = []
    this.generateData()
  }

  readData() {
    return fs.readFileSync(this._file, 'utf8').split('\n')
  }

  generateData() {
    let readcsv = this.readData()

    for (let i = 0; i < readcsv.length; i++) {
      readcsv[i] = readcsv[i].split(',')
      this.people.push(new Person(readcsv[i][0], readcsv[i][1], readcsv[i][2], readcsv[i][3], readcsv[i][4], readcsv[i][5]))
    }
    
  }

  save() {
    let saveData = [];

    for (let i = 0; i < this._people.length; i++) {
      saveData.push(Object.values(this._people[i]).join(','))
    }

    fs.writeFileSync(this._file, saveData.join('\n'))
  }

  addPerson(data) {
    return this._people.push(data)
  }

  get people() {
    return this._people
  }

  get file() {
    return this._file
  }

}

let parser = new PersonParser('people.csv')

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)

// ============ DATA TESTER ================ //
parser.addPerson(new Person(201, 'Arief', 'Rachman', 'arievrchman@gmail.com', '08-1212-63-0070', new Date().toISOString()))
// console.log(parser.people); // log data people dari class Person Parser
parser.save()