const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb){
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
      return cb(new Error("Expected file extensions JPG, JPEG, PNG"));
    }
    cb(undefined, true);
  }
});


module.exports = upload;
