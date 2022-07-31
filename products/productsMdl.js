const db = require("../db/config");

// all products
const getAllProducts = () => {
  const query =
    "SELECT id, name, category, description, price, image FROM products";
  try {
    return db.query(query);
  } catch (error) {
    error.message = error.code;
  }
};

// one product
const getOneProduct = async (id) => {
  const query = `SELECT id, name, category, description, price, image FROM products WHERE id = ${id} `;
  try {
    console.log("query one prod");
    return await db.query(query);
  } catch (error) {
    console.log("error one prod");
    error.message = error.code;
  }
};

// add new product
const addOneProduct = (product) => {
  const query = `INSERT INTO products SET ?`;
  try {
    return db.query(query, product);
  } catch (error) {
    error.message = error.code;
  }
};

// edit product
const editOneProduct = async (id, product) => {
  const query = `UPDATE products SET ? WHERE id = ${id}`;
  try {
    return await db.query(query, product);
  } catch (error) {
    error.message = error.code;
  }
};

// delete product
const deleteOneProduct = async (id) => {
  const query = `DELETE FROM products WHERE id = ${id}`;
  try {
    return await db.query(query);
  } catch (error) {
    error.message = error.code;
  }
};

// buscar por palabra
const getProductsWith = async (string) => {
  const query = `SELECT id, name, category, description, price, image FROM products WHERE name LIKE '%${string}%'`;
  try {
    return await db.query(query);
  } catch (error) {
    error.message = error.code;
  }
};

module.exports = {
  getAllProducts,
  getOneProduct,
  addOneProduct,
  editOneProduct,
  deleteOneProduct,
  getProductsWith,
};
