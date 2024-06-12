const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const pdfUpload = new mongoose.Schema({
  pdf: {
    type: String,
    require: true,
  },
});
const PdfUpload = mongoose.model("pdfUpload", pdfUpload);
module.exports = PdfUpload;
