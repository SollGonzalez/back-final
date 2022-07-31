// conexion con la db
const db = require("../db/config");

// all users
const getAllUsers = async () => {
  const query = `SELECT id, name, email FROM users`;
  try {
    return await db.query(query);
  } catch (error) {
    error.message = error.code;
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// one user
const getOneUser = async (id) => {
  const query = `SELECT id, name, email FROM users WHERE id = ${id}`;
  try {
    return await db.query(query);
  } catch (error) {
    error.message = error.code;
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// add new user, recibe un parametro porque añade a la tabla un objeto
const registerNewUser = async (user) => {
  const query = `INSERT INTO users SET ?`;
  try {
    return await db.query(query, user);
  } catch (error) {
    error.message = error.code;
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------
// login user
const loginUser = async (email) => {
  const query = `SELECT * FROM users WHERE email = '${email}'`;
  try {
    return await db.query(query);
  } catch (error) {
    error.message = error.code;
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// edit user by id
const editUserById = async (id, user) => {
  const query = `UPDATE users SET ? WHERE id = ${id}`;
  try {
    return await db.query(query, user);
  } catch (error) {
    error.message = error.code;
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// delete user by id
const deleteOneUser = async (id) => {
  const query = `DELETE FROM users WHERE id = ${id}`;
  try {
    return await db.query(query);
  } catch (error) {
    error.message = error.code;
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  registerNewUser,
  loginUser,
  editUserById,
  deleteOneUser,
};
