const bcrypt = require('bcrypt');

module.exports = {
  signup: (req, res) => {
    const {email, password} = req.body

    let newDatabaseEntry = {}
    newDatabaseEntry.email = email
    newDatabaseEntry.password = password
    newDatabaseEntry.destiny = destinies[Math.floor(Math.random() * destinies.length)]
    console.log('\nNew database entry: ')
    console.log(newDatabaseEntry)
    database.push(newDatabaseEntry)
    res.status(200).send({success: true})
  },
  login: (req, res) => {
    const {email, password} = req.body
    let userData

    for (let i=0; i<database.length; i++) {
      if (email === database[i].email && password === database[i].password) {
        userData = database[i]
      }
    }

    if (!userData) {
      res.status(200).send({success: false, message: 'bad password or username'})
    } else {
      const destinyIntro = "Your final destiny is to "
      res.status(200).send({success: true, destiny: userData.destiny, intro: destinyIntro})
    }
  }
}


const database = [
  {
    email:'john@gmail.com',
    password:'1234asdf',
    destiny:'becoming the new Santa'
  },
  {
    email:'sallybonnet@yahoo.com',
    passwordHash:'funpassword',
    destiny:'becoming best friends with Martha Stewart'
  },
]


const destinies = [
  'become a well-respected bartender',
  'cure cancer',
  'become a bear whisperer',
  'become a hoarder',
  'become the lead in a high-budget film, filling in for Henry Cavill when he unexpectedly goes MIA',
  'summit Everest',
  'become the next Bruce Willis',
]