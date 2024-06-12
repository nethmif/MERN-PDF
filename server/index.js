const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/authRoute");
const pdfRouter = require("./routes/pdf");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fs = require("fs");
require("dotenv").config();
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
// app.use("/api", pdfRouter);
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require("./routes/" + r))
);
mongoose
  .connect("mongodb://127.0.0.1:27017/authentication")
  .then(() => console.log("Connnected to MongoDB!"))
  .catch((error) => console.error("Failed to connect to MongoDB:", error));

app.use((err, req, res, next) => {
  err.statuCode = err.statuCode || 500;
  err.status = err.status || "error";

  res.status(err.statuCode).json({
    status: err.status,
    message: err.message,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
