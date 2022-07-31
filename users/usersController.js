// modelos
const {
  getAllUsers,
  getOneUser,
  registerNewUser,
  loginUser,
  editUserById,
  deleteOneUser,
} = require("./usersMdl");

// utils
const { encrypt, compare } = require("../utils/handlePass");
const notNumber = require("../utils/notNumer");
const { matchedData } = require("express-validator");
const { createToken, verifyToken } = require("../utils/handleJwt");
const nodemailer = require("nodemailer");
const public_url = process.env.public_url;

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.mail_user,
    pass: process.env.mail_pass,
  },
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

const listAll = async (req, res, next) => {
  const dbResponse = await getAllUsers();
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

const listOne = async (req, res, next) => {
  if (notNumber(req.params.id, next)) return;
  const dbResponse = await getOneUser(+req.params.id);
  if (dbResponse instanceof Error) return next(dbResponse);
  if (!dbResponse.length) return next;
  res.status(200).json(dbResponse);
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

const registerUser = async (req, res, next) => {
  const cleanBody = matchedData(req);

  // encriptar contraseña
  const dbResponse = await registerNewUser({
    ...cleanBody,
    password: await encrypt(req.body.password),
  });
  if (dbResponse instanceof Error) return next(dbResponse);

  // objeto para crear el token
  const user = {
    id: cleanBody.id,
    name: cleanBody.name,
    email: cleanBody.email,
  };

  const token = await createToken(user, "2h");
  res.cookie("token", token).status(201).json({
    message: "registered",
    JWT: token,
    userid: user.id,
    name: user.name,
    email: user.email,
  });

  // res.status(201).json({
  //   message: `User ${req.body.name} created`,
  //   JWT: token,
  // });
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------
// login user
const login = async (req, res, next) => {
  const dbResponse = await loginUser(req.body.email);

  if (!dbResponse.length) return next();
  // comparamos pass con pass encriptada
  if (await compare(req.body.password, dbResponse[0].password)) {
    const user = {
      id: dbResponse[0].id,
      name: dbResponse[0].name,
      email: dbResponse[0].email,
    };
    const token = await createToken(user, "6h");
    res.cookie("token", token).status(200).json({
      message: "login",
      JWT: token,
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    let error = new Error("Unauthorized");
    error.status = 401;
    next(error);
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

const editUser = async (req, res, next) => {
  if (notNumber(req.params.id, next)) return;
  const dbResponse = await editUserById(+req.params.id, req.body);
  if (dbResponse instanceof Error) return next(dbResponse);
  // preguntamos si en la dbresponse hay filas afectadas, porque el arreglo nunca esta vacio
  dbResponse.affectedRows
    ? res.status(200).json({ message: `User modified` })
    : next();
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// const deleteUser
const deleteUser = async (req, res, next) => {
  if (notNumber(req.params.id, next)) return;
  const dbResponse = await deleteOneUser(+req.params.id);
  if (dbResponse instanceof Error) return next(dbResponse);
  !dbResponse.affectedRows ? next() : res.status(204).end();
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

const forgot = async (req, res, next) => {
  const dbResponse = await loginUser(req.body.email);
  if (!dbResponse.length) return next();

  const user = {
    id: dbResponse[0].id,
    name: dbResponse[0].name,
    email: dbResponse[0].email,
  };

  // token con tiempo para que la cambie pq expira
  const token = await createToken(user, "30m");
  // link para mandarle el mail de verificacion
  const link = `${public_url}/users/reset/${token}`;

  const mailDetails = {
    from: "lupes.support@gmail.com",
    to: user.email,
    subject: `Recuperación de contraseña`,
    html: `<h2> Servicio de recuperación de contraseña </h2>
    <p> Para restablecer su contraseña, haga clic en el enlace y siga las instrucciones</p>
    <a href="${link}"> Haga clic para recuperar su contraseña</a>`,
  };
  transport.sendMail(mailDetails, (error) => {
    if (error) {
      error.message = "Error del servidor de correo";
      next(error);
    } else {
      res.status(200).json({
        message: `Hola ${user.name}, hemos enviado un correo electrónico con instrucciones a ${user.email}... ¡Date prisa el enlace expirará pronto!`,
      });
    }
  });
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

const reset = async (req, res, next) => {
  const { token } = req.params;
  // verificacion de token con datos
  const tokenStatus = await verifyToken(token);
  if (tokenStatus instanceof Error) {
    res.send(tokenStatus);
  } else {
    console.log("cambio de pass");
  }
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// ver si funciona
const savePass = async (req, res, next) => {
  const { token } = req.params;
  const tokenStatus = await verifyToken(token);

  if (tokenStatus instanceof Error) return res.send(tokenStatus);

  const newPassword = await encrypt(req.body.password_1);
  // mandamos a la db el cambio
  const dbResponse = await editUserById(tokenStatus.id, {
    password: newPassword,
  });
  dbResponse instanceof Error
    ? next(dbResponse)
    : res
        .status(200)
        .json({ message: `Password cambiada ${tokenStatus.name}` });
};

module.exports = {
  listAll,
  listOne,
  registerUser,
  login,
  editUser,
  deleteUser,
  forgot,
  reset,
  savePass,
};
