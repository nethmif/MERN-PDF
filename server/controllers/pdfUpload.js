const pdfUpload = require("../models/pdfUpload");
exports.pdfUpload = async (req, res) => {
  console.log(req.body);
  try {
    const x = new pdfUpload({ pdf: req.body.image });
    await x.save();
    return res.status(200).json({ message: "Saved" });
  } catch (err) {
    return res.status(400).json({ message: "Error " });
  }
};
