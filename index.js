const express = require("express");
const server = express();
const PORT = process.env.PORT;
require("dotenv").config();
require("./db/config");

const cors = require("cors");

// servidor express pueda interpretar los mensajes
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(cors());

// static
server.use(express.static("storage"));

// puerto lanzado
server.listen(PORT, (err) => {
  err
    ? console.warn(`Hubo un error {
        message: ${err} }`)
    : console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

//welcome endpoint
server.get("/", (req, res) => {
  const content = `
  <h1>Nuestra API con Express</h1>
  <pre>Bienvenidos a nuestra API construida con Node JS y el framework Express</pre>
  `;
  res.send(content);
});

// endpoints
server.use("/users", require("./users/usersRoutes"));
server.use("/products", require("./products/productsRoutes"));

// ------------------------------------------------------------------------------------------------------------------------------------------------------------

// catch all routes (404), aca vienen con el next
server.use((req, res, next) => {
  // objeto de la clase error
  const error = new Error("No hay nada");
  // estado del error
  error.status = 404;
  // manejador de errores, con el argumento error
  next(error);
});

// error handler (cada vez que haya un error cae aca)
server.use((error, req, res, next) => {
  // si el obj de tipo error no tiene estado
  if (!error.status) {
    // el estado que sea 500 (error interno)
    error.status = 500;
  }
  res.status(error.status);
  res.json({ status: error.status, message: error.message });
});
