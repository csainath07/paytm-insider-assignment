const express = require("express");
const cors = require("cors");
const multer = require('multer');
const upload = multer();
const uploadFile = require("./upload");

const PORT = 8000;

// Express Instance
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// file uploading api
app.post('/api/file/upload', upload.array('images'), (req, res) => {
  uploadFile(req, res);
});

app.listen(PORT, () => {
  console.log("Server started");
});