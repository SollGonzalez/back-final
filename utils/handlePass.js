// encriptar pass
const bcrypt = require("bcrypt");

const saltRounds = 10;

const encrypt = async (passwordPlain) => {
  return await bcrypt.hash(passwordPlain, saltRounds);
};

// comparacion de pass
const compare = async (passwordPlain, hashedPass) => {
  return await bcrypt.compare(passwordPlain, hashedPass);
};

module.exports = { encrypt, compare };
