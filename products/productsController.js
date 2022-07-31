const {
  getAllProducts,
  getOneProduct,
  addOneProduct,
  editOneProduct,
  deleteOneProduct,
  getProductsWith,
} = require("./productsMdl");

const public_url = process.env.public_url;
const { matchedData } = require("express-validator");
// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// all products
const listAll = async (req, res, next) => {
  const dbResponse = await getAllProducts();
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

const findProduct = async (req, res, next) => {
  let dbResponse = null;
  if (req.query.name) {
    dbResponse = await getProductsWith(req.query.name);
  } else {
    dbResponse = await getAllProducts();
  }
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// one product
const listOne = async (req, res, next) => {
  // var para atajar el modelo
  const dbResponse = await getOneProduct(+req.params.id);
  console.log(dbResponse);
  // si db es un error
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

const newProduct = async (req, res, next) => {
  // const urlFile = `${public_url}/${req.file.filename}`;
  // const dbResponse = await addOneProduct({ ...req.body, image: urlFile });
  const dbResponse = await addOneProduct({ ...req.body });
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.affectedRows
    ? res.status(201).json({ message: `Product add` })
    : next();
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

const editProduct = async (req, res, next) => {
  // const urlFile = `${public_url}/${req.file.filename}`;
  const dbResponse = await editOneProduct(+req.params.id, {
    ...req.body,
    // image: urlFile,
  });
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.affectedRows
    ? res.status(200).json({ message: `Product modified` })
    : next();
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

const deleteProduct = async (req, res, next) => {
  const dbResponse = await deleteOneProduct(+req.params.id);
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.affectedRows
    ? res.status(200).json({ message: `Product delete` })
    : next();
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
  listAll,
  findProduct,
  listOne,
  newProduct,
  editProduct,
  deleteProduct,
};
