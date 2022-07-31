const { check, validationResult } = require("express-validator");

const validatorNewUser = [
  // validar nombre
  check("name")
    .exists()
    .withMessage("Name required")
    // espacios vacios
    .trim()

    .isAlpha("es-ES", { ignore: " " })
    .withMessage("Only letters")

    .isLength({ min: 3, max: 100 })
    .withMessage("Character count: min 3, max 100"),

  check("email")
    .exists()
    .withMessage("Email required")
    .trim()

    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),

  check("password")
    .exists()
    .trim()

    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be 8-15 characters long"),

  // funcion q corre las validaciones
  (req, res, next) => {
    try {
      // throw: instrucción define un error personalizado
      validationResult(req).throw();
      return next();
    } catch (error) {
      // si hay algun error se manda un bad request y se muestra el error en formato array
      res.status(400).json({ errors: error.array() });
    }
  },
];

const validatorEditUser = [
  check("name")
    .exists()
    .withMessage("Name required")
    .trim()

    .isAlpha("es-ES", { ignore: " " })
    .withMessage("Only letters")

    .isLength({ min: 3, max: 50 })
    .withMessage("Character count: min 3, max 50"),

  check("email")
    .exists()
    .withMessage("Email required")
    .trim()

    .isEmail()
    .withMessage("Must be a valid email address")
    .normalizeEmail(),

  (req, res, next) => {
    try {
      validationResult(req).throw();
      return next();
    } catch (error) {
      res.status(400).json({ errors: error.array() });
    }
  },
];

const validatorResetPass = [
  check("password_1")
    .exists()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be 8-15 characters long")
    .trim(),

  check("password_2")
    // compara pass2 con el obj req
    .custom(async (password_2, { req }) => {
      const password_1 = req.body.password_1;
      if (password_1 !== password_2) {
        throw new Error("Password must be identical");
      }
    }),
  (req, res, next) => {
    const token = req.params.token;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const arrWarnings = errors.array();
      console.log(arrWarnings);
    } else return next();
  },
];

module.exports = { validatorNewUser, validatorEditUser, validatorResetPass };
