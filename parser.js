"use strict"
const fs = require('fs')


class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(obj){
    this.id = obj.id
    this.first_name = obj.first_name
    this.last_name = obj.last_name
    this.email = obj.email
    this.phone = obj.phone
    this.created_at = obj.created_at
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.listPerson()
  }

  get people() {
    return this._people
  }
  get file() {
    return this._file
  }
  set people(obj) {
    this._people.push(obj)
  }

  addPerson(dataPerson) {
    let people = []
    for (const data in dataPerson) {
      people.push(dataPerson[data])
    }
    this.people.push(people)
   
    return this
  }
  
  listPerson(){
      let data =  fs.readFileSync(this._file,"utf-8").split('\n')
  
     console.log(data)
      let result = []
      for(let i = 0; i < data.length; i ++){
        result.push(data[i].split(','))
      }    
 
      for(let i = 0; i < result.length; i++){
        let obj = new Person ({
           id :result[i][0], 
           first_name :result[i][1], 
           last_name : result[i][2], 
           email: result[i][3], 
           phone: result[i][4], 
           created_at: result[i][5]
        })
        this.people.push(obj)
      }

   
  }
  save(){
    let tempListData = []
    for(let i = 0 ; i < this.people.length; i++){
        tempListData.push(Object.values(this.people[i]))
      
    }
    // let hasil = tempListData.join('\n')
    // console.log(hasil)
    fs.writeFileSync(this._file,tempListData.join('\n'))
    console.log('Sukses add Data');
    
  }

}


let parser = new PersonParser('people.csv')

let christian = {
  id : parser.people.length,
  first_name: 'Christian' ,
  last_name: 'Sihotang' ,
  email: 'christian.sihotang23@gmail.com',
  phone: '081927284401' , 
  created_at: JSON.parse(JSON.stringify(new Date()))
}

console.log(parser.people)
console.log(parser.addPerson(new Person(christian)))
parser.save()
//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
