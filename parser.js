"use strict"
const fs = require('fs');
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
    constructor(obj){
        this.id = obj.id;
        this.first_name = obj.first_name;
        this.last_name = obj.last_name;
        this.email = obj.email;
        this.phone = obj.phone;
        this.created_at = obj.created_at;
    }
}

class PersonParser {

    constructor(file) {
        this._file = file
        this._people = [];
        this.listPeople();
    }


    get people() {
        return this._people;
    }

    set people(obj) {
        this._people.push(obj);
    }
    
    get file() {
        return this._file;
    }

    listPeople () {
        let dataPeople = fs.readFileSync('./people.csv','utf-8').split('\n');
        for (let i = 0 ;  i < dataPeople.length; i++) {
            let person = dataPeople[i].split(',');
            let objPerson = {
                id : person[0],
                first_name : person[1],
                last_name : person[2],
                email : person[3],
                phone : person[4],
                created_at : person[5]
            };
            this.people = new Person(objPerson);
        }
    }

    addPerson(person) {
        this.people = person;
    }

    save(){
        let dataSave = [];
        this.people.forEach( e => {
            dataSave.push(Object.values(e).join(','));
        });
        fs.writeFileSync(this._file,dataSave.join('\n'));
    }
}

let parser = new PersonParser('people.csv')

let newPerson = {
    id : parser.people.length,
    first_name : 'Herman',
    last_name : 'Yulianto',
    email : 'hermanboy53@gmail.com',
    phone : '081213183958',
    created_at : JSON.stringify(new Date())
}

parser.addPerson(new Person(newPerson));
//console.log(parser.people);
parser.save();
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
