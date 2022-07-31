const { check, validationResult } = require("express-validator");

const validatorProduct = [
  check("name")
    .exists()
    .withMessage("Name required")
    .notEmpty()
    .isLength({ min: 4, max: 50 })
    .withMessage("Character count: min 4, max 50"),

  check("category").exists().withMessage("Category required").notEmpty(),

  check("description")
    .exists()
    .withMessage("Description required")
    .notEmpty()
    .isLength({ min: 0, max: 140 })
    .withMessage("Character count: max 140"),

  check("price")
    .exists()
    .withMessage("Price required")
    .notEmpty()
    .isNumeric()
    .isLength({ min: 2, max: 8 })
    .withMessage("Character count: max 8"),

  (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) res.status(400).json({ errors: err.array });
    else next();
  },
];

module.exports = validatorProduct;
