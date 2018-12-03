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
    // console.log(this._people);
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
    for (let i = 0; i < files.length; i++) {
      let detail = files[i].split(',');
      datas.push(detail);
    }
    return datas;
  }

  existingPerson() {
    let datas = this.readFile();
    // console.log(datas);
    for (let i = 0; i < datas.length; i++) {
      let peopleData = new Person(datas[i][0], datas[i][1], datas[i][2], datas[i][3], datas[i][4], datas[i][5]);
      // console.log(peopleData);
      this.people = peopleData;
    }
  }

  addPerson(input) {
    this.people = input;
  }

  save() {
    let datas = this.people;
    // console.log(datas);
    let result = '';
    for (let i = 0; i < datas.length; i++) {
      result += datas[i].id + ',' + datas[i].firstName + ',' + datas[i].lastName + ',' + datas[i].email + ',' + datas[i].phoneNumber + ',' + datas[i].createTime;
      if (i !== datas.length - 1) {
        result += '\n';
      }
    }
    fs.writeFileSync(this.file, result);
  }
}

let parser = new PersonParser('people.csv');
let date = JSON.parse(JSON.stringify(new Date()));
parser.addPerson(new Person(201, 'Kyle', 'Setan', 'kylesetan@gmail.com', '1-29485-843', date));
parser.save();
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
