const router = require("express").Router();

// controladores
const {
  listAll,
  listOne,
  newProduct,
  editProduct,
  deleteProduct,
  findProduct,
} = require("./productsController");

const isAuth = require("../middleware/isAuth");
const validatorProduct = require("../validators/productsValidator");

const uploadFile = require("../utils/handleStorage");

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// all products
router.get("/", listAll);

router.get("/search", findProduct);

// get one product by id
router.get("/:id", listOne);

// ------------------------------------------------------------------------------------------------------------------------------------------------------------
// solo para el user que pueda modificar

// agregar
router.post(
  "/",
  isAuth,
  uploadFile.single("file"),
  validatorProduct,
  newProduct
);

// modificar
router.patch(
  "/:id",
  isAuth,
  uploadFile.single("file"),
  validatorProduct,
  editProduct
);

// borrar
router.delete("/:id", isAuth, deleteProduct);

module.exports = router;
