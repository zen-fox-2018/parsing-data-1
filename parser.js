"use strict"
const fs = require('fs');
const data = fs.readFileSync('./people.csv', 'utf8');

class Person {
  constructor(id, firstName, lastName, email, phoneNumber, createTime) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.createTime = createTime;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
    this.existingPerson();
    console.log(this._people);
  }

  get people() {
    return this._people;
  }

  get file() {
    return this._file;
  }

  set people(input) {
    this._people.push(input);
  }

  readFile() {
    let files = data.split('\n');

    let datas = [];
    for (let i = 1; i < files.length; i++) {
      let detail = files[i].split(',');
      datas.push(detail);
    }
    return datas;
  }

  existingPerson() {
    let datas = this.readFile();
    for (let i = 0; i < datas.length; i++) {
      let peopleData = new Person(datas[i][0], datas[i][1], datas[i][2], datas[i][3], datas[i][4], datas[i][5]);
      this.people = peopleData;
    }
  }

  addPerson(input) {
    this.people = input;
  }

  save() {
    let result = '';
    for (let i = 0; i < this.people.length; i++) {
      result += this.people[i].id + ',' + this.people[i].firstName + ',' + this.people[i].lastName 
      + ',' + this.people[i].email + ',' + this.people[i].phoneNumber + ',' + this.people[i].createTime + '\n';
    }
    fs.writeFileSync('./people.csv', result);
  }

}

let parser = new PersonParser('people.csv')
// console.log(PersonParser);
let date = JSON.parse(JSON.stringify(new Date()));
parser.addPerson(new Person(202, 'Kyle', 'Setan', 'kylesetan@gmail.com', '1-29485-843', date));

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`);
parser.save();
