const multer = require("multer");

function uploadFile(destination, fileTypes) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      cb(
        null,
        Date.now() + "-" + file.originalname.toLowerCase().split(" ").join("-")
      );
    },
  });

  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (fileTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb("Only " + fileTypes.join(", ") + " format allowed!", false);
      }
    },
  });

  return upload.single("file");
}

module.exports = { uploadFile };
