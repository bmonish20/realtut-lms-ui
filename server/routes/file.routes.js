const express = require("express");
const service = require("../services/file.service");

const router = express.Router();

router.post("/upload/:path/:email", service.UploadFile);
router.get("/download/:path/:email", service.GetFileUrl);
router.delete("/delete/:path/:key", service.DeleteFile);

module.exports = router;
