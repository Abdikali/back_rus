const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const studentRouter = require("../routers/student.route");
const port = process.env.PORT || 3000;


const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/students", studentRouter);

mongoose.connect("mongodb://127.0.0.1:27017/students")
.then(connection => {
  console.log("Connected");
})
.catch(e => console.log("Failed to connect"));

app.listen(port, () => {
  console.log("Server started");
});
