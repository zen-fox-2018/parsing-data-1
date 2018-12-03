"use strict"
const fs = require('fs');
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
    constructor(obj){
        this.id = parser.people.length;
        this.first_name = obj.first_name;
        this.last_name = obj.last_name;
        this.email = obj.email;
        this.phone = obj.phone;
        this.created_at = JSON.stringify(new Date());
    }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = fs.readFileSync(file, 'utf-8').split('\n');
      //this._size = this._people.length;
  }

  get people() {
    return this._people;
  }
    
  get file() {
    return this._file;
  }
    
    addPerson(obj) {
        let newPerson = Object.values(obj).join(',');
        console.log(newPerson);
        this._people.push(newPerson);
    }

    save(){
        fs.writeFileSync(this._file,this._people.join('\n'));
    }
}

let parser = new PersonParser('people.csv')

//console.log(parser.people);

let newPerson = {
    first_name : 'Herman',
    last_name : 'Yulianto',
    email : 'hermanboy53@gmail.com',
    phone : '081213183958'
}

parser.addPerson(new Person(newPerson));
//parser.save();
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
