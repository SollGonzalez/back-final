const { verifyToken } = require("../utils/handleJwt");

const isAuth = async (req, res, next) => {
  // si no hay autorizacion
  if (!req.headers.authorization) {
    let error = new Error("No token provided");
    console.log("token no autorizado");
    error.status = 403;
    return next(error);
  }
  // variable con token limpio
  const token = req.headers.authorization.split(" ").pop();
  // variable para verificar el token verificado
  const validToken = await verifyToken(token);

  // token verificado vino con error
  if (validToken instanceof Error) {
    error.message = "Token expired or invalid";
    console.log("error en el token");
    error.status = 403;
    return next(error);
  }
  req.user = validToken;
  next();
};

module.exports = isAuth;
