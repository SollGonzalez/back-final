const router = require("express").Router();

// controllers
const {
  listAll,
  listOne,
  registerUser,
  login,
  editUser,
  deleteUser,
  forgot,
  reset,
  savePass,
} = require("./usersController");

// validaciones
const {
  validatorNewUser,
  validatorEditUser,
  validatorResetPass,
} = require("../validators/usersValidator");

// para que necesito all y one de los users?
// traer todos
router.get("/", listAll);

// traer uno solo
router.get("/:id", listOne);

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// agregar
router.post("/", validatorNewUser, registerUser);

// login
router.post("/login", login);

// modificar
router.patch("/:id", validatorEditUser, editUser);

// borrar
router.delete("/:id", deleteUser);

// forgot pass
router.post("/forgot-password", forgot);

// resetear pass
router.get("/reset/:token", reset);

// nueva pass, viene del post con validaciones
router.post("/reset/:token", validatorResetPass, savePass);

module.exports = router;
