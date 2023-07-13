const bcrypt = require('bcrypt');

module.exports = {
  signup: (req, res) => {
    const { email, password } = req.body;
    const saltRounds = 10;

    bcrypt.hash(password, saltRounds, (err, passwordHash) => {
      if (err) {
        console.error('Error hashing password:', err);
        res.status(500).send({ success: false, message: 'Error signing up' });
        return;
      }

      let newDatabaseEntry = {};
      newDatabaseEntry.email = email;
      newDatabaseEntry.passwordHash = passwordHash;
      newDatabaseEntry.destiny = destinies[Math.floor(Math.random() * destinies.length)];

      console.log('\nNew database entry: ');
      console.log(newDatabaseEntry);

      database.push(newDatabaseEntry);
      res.status(200).send({ success: true });
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    let userData;

    for (let i = 0; i < database.length; i++) {
      if (email === database[i].email) {
        if (bcrypt.compareSync(password, database[i].passwordHash)) {
          userData = database[i];
          break;
        }
      }
    }

    if (!userData) {
      res.status(200).send({ success: false, message: 'Bad password or username' });
    } else {
      const destinyIntro = 'Your final destiny is to ';
      res.status(200).send({ success: true, destiny: userData.destiny, intro: destinyIntro });
    }
  }
};

const database = [
  {
    email: 'john@gmail.com',
    passwordHash: '$2b$10$HzeKYq7PcQl17h1u0RPRa.j21cXHfnk3xYr./x2mF24C8STe5gEgC',
    destiny: 'becoming the new Santa'
  },
  {
    email: 'sallybonnet@yahoo.com',
    passwordHash: '$2b$10$aaNK.wu/6CIlIRXF9ooelK.nO9.6NPQYdzEax8tpyTDU16A5ZsA5ZO',
    destiny: 'becoming best friends with Martha Stewart'
  },
];

const destinies = [
  'become a well-respected bartender',
  'cure cancer',
  'become a bear whisperer',
  'become a hoarder',
  'become the lead in a high-budget film, filling in for Henry Cavill when he unexpectedly goes MIA',
  'summit Everest',
  'become the next Bruce Willis'
];
