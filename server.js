const express = require("express");
const connectionDB = require("./db");
const router = require("./routes/index");

const app = express();
app.use(express.json());

app.use(router);

app.get("/private", (req, res) => {
  res.status(200).json({ message: "this is " });
});

connectionDB("mongodb://localhost:27017/student_attendence3")
  .then(() => {
    console.log("Database Connected");
    app.listen(4000, () => {
      console.log("Server is on port 4000");
    });
  })

  .catch((e) => console.log(e));
