const exp = require("constants");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const gym_Routes = require("./routes/database.routes.js")
require('dotenv').config()
const port_no = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "Hi there You better learn CRUD and Mongo DB in a few hours else you gonna regret that"
  );
});

app.use("/api/gym/members",gym_Routes)


mongoose
  .connect(
    process.env.MONGO_DB_URI
  )
  .then(() => {
    console.log("Conneted to DB");
    app.listen(port_no, () => {
      console.log(`Server listening on Port ${port_no}`);
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  });
