const multer = require("multer");
// const req  =require("../storage")
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // indico el camino de donde esta el almacenamiento porque despues lo mando al callback
    const pathStorage = `${__dirname}/../storage`;
    callback(null, pathStorage);
    console.log(pathStorage, "handlestor");
  },
  filename: (req, file, callback) => {
    const ext = file.originalname.split(".").pop();

    const filename = `file_${Date.now()}.${ext}`;
    console.log(filename, "nombrearchivo");
    // por ahora null por que no atajamos los errores
    callback(null, filename);
  },
});

const uploadFile = multer({ storage });

module.exports = uploadFile;
