const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const path = require("path");

dotenv.config();

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(cors());

const uploads = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploads));

app.use("/api", require("./routes/Auth"));


app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
