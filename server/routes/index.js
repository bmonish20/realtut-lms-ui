const express = require('express');
const session = require('../middlewares/sessionManager');
const authRoutes = require('./auth.routes');
const fileRoutes = require('./file.routes');
const userRoutes = require('./user.routes');
const authorisedRoutes = require("./authorised.routes");
const appDataRoutes = require("./appData.routes");
const multer = require('multer');
var storage = multer.memoryStorage({
  destination: function (req, file, callback) {
      callback(null, '');
  }
});

var upload = multer({ storage: storage }).single('file');
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/file',upload,session.protected,fileRoutes)
router.use('/user',session.protected,userRoutes)
router.use('/appData',appDataRoutes)
router.use('', session.protected, authorisedRoutes);

module.exports = router;