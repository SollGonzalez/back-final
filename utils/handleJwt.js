const jwt = require("jsonwebtoken");
const jwt_key = process.env.jwt_key;

// crear token
const createToken = async (user, time) => {
  const signIn = jwt.sign(user, jwt_key, { expiresIn: time });
  return signIn;
};

// verificar token
const verifyToken = async (token) => {
  try {
    // devuelve el token si lo tiene
    return jwt.verify(token, jwt_key);
  } catch (error) {
    return error;
  }
};

module.exports = { createToken, verifyToken };
