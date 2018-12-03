"use strict"

const fs = require('fs')

let array = fs.readFileSync('people.csv', "utf8").split('\n')
console.log(array)
// let array2 = array[1].split(',')
// console.log(array2)

let hasil = []
for (let i = 0; i < array.length; i++) {
  hasil.push(array[i].split(','))
}
// console.log(hasil)
let hasil2 = []
for (let i = 1; i < hasil.length; i++) {
  let objHasil = {}
  for (let j = 0; j < hasil[i].length; j++) {
    objHasil[hasil[0][j]] = hasil[i][j]
  }
  hasil2.push(objHasil)
}
console.log(hasil2)




class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }

  get fullName() {
    return `${this.first_name} ${this.last_name}`
  }

  showProfile() {

  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = fs.readFileSync('people.csv', "utf8").split('\n')
    // this._earlyPeople = fs.readFileSync('people.csv', "utf8").split('\n')
  }

  set people(gantiPeople) {
    this._people = gantiPeople
  }

  get people() {
    return this._people
  }

  penggantiFormatPeople() {
    let hasil = []
    for (let i = 0; i < this._people.length; i++) {
      hasil.push(array[i].split(','))
    }
    // console.log(hasil)
    let hasil2 = []
    for (let i = 1; i < hasil.length; i++) {
      let objHasil = new Person()
      for (let j = 0; j < hasil[i].length; j++) {
        objHasil[hasil[0][j]] = hasil[i][j]
      }
      hasil2.push(objHasil)
    }
    return hasil2
  }

  addPerson(object) {
    this._people.push(object)
   }

  balikinKeString(){
    let hasil = []
    for ( let i = 0; i < this._people.length; i++) {
      let hasilDalam = ''
      for ( var j in this._people[i]){
        // console.log(i,j)
        hasilDalam += this._people[i][j]
        if( j != 'created_at'){
          hasilDalam += ','
        }        
      }
      hasil.push(hasilDalam)
    }
    hasil.unshift('id,first_name,last_name,email,phone,created_at')
    // return hasil
  }

   save() {
    fs.writeFileSync(this._file, this._people.join('\n'), 'utf8')
   }

}

// step to do this JS
//1 initiate class PersonParser 
let parser = new PersonParser('people.csv')
//2 ganti format people jadi objek class Person
parser.people = parser.penggantiFormatPeople() //akses seperti ini kaya dianggep getter sperti property
// console.log(parser.people)

//3 buat dan tambahkan data yang akan ditambahkan ke people.csv
let person202 = new Person('501','anton','wibisono','anton@email.org','1235023', new Date())
parser.addPerson(person202)
// console.log(parser.people[1].id)

//4 balikkan format people menjadi format awal CSV
parser.people = parser.balikinKeString()
// console.log(parser.balikinKeString())

//5 SAVE agar tersimpan dalam people.csv
parser.save()


// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
