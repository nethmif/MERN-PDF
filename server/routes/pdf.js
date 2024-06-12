const express = require("express");
const router = express.Router();
const { pdfUpload } = require("../controllers/pdfUpload");
router.post("/upload", pdfUpload);
module.exports = router;
