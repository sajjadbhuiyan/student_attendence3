const express = require("express");
const connectionDB = require("./db");
const authenticate = require("./middleware/authenticate");
const router = require("./routes/index");

const app = express();
app.use(express.json());

app.use(router);

app.get("/private", authenticate, (req, res, next) => {
  return res.status(200).json({ message: "This is Private Route" });
});

app.get("/public", (req, res, next) => {
  return res.status(200).json({ message: "This is Public route" });
});

app.use((req, res, next) => {
  const error = new Error("page not found");
  error.status = 404;
  next(error);
});

app.use((error, _req, res, _next) => {
  if (error.message) {
    const message = error.message ? error.message : "server error occured";
    const status = error.status ? error.status : 500;

    return res.status(status).json({ message });
  }
});

connectionDB("mongodb://localhost:27017/student_attendence3")
  .then(() => {
    console.log("Database Connected");
    app.listen(4000, () => {
      console.log("Server is on port 4000");
    });
  })

  .catch((e) => console.log(e));
