// funcion pregunta si lo que viene no es un numero
const notNumber = (id, next) => {
  if (isNaN(Number(id)) || Number(id) < 1) {
    const error = new Error(
      "ID debe ser un numero entero positivo mayor que 0"
    );
    // estado
    error.status = 400;
    next(error);
    return true;
  } else {
    return false;
  }
};
module.exports = notNumber;
