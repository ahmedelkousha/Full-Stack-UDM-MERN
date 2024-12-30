const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userInfo = require("./models/Users");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

module.exports = app.get("/", (req, res) => {
  userInfo
    .find({})
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get(
  "/getUser/:id",
  (module.exports = (req, res) => {
    const id = req.params.id;
    userInfo
      .findById({ _id: id })
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.log(err);
      });
  })
);

app.put(
  "/updateUser/:id",
  (module.exports = (req, res) => {
    const id = req.params.id;
    userInfo
      .findByIdAndUpdate(
        { _id: id },
        { Name: req.body.Name, Email: req.body.Email, Age: req.body.Age }
      )
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.json(err);
      });
  })
);

app.delete(
  "/deleteUser/:id",
  (module.exports = (req, res) => {
    const id = req.params.id;
    userInfo
      .findByIdAndDelete({ _id: id })
      .then((res) => {
        res.json(res);
      })
      .catch((err) => {
        res.json(err);
      });
  })
);

app.post(
  "/createUser",
  (module.exports = async (req, res) => {
    await userInfo
      .create(req.body)
      .then((user) => {
        console.log(req.body);

        res.json(user);
        console.log("Data sent to DB Successfully!");
      })
      .catch((err) => {
        res.json(err);
        console.log("Error, Data failed to be sent to DB!", err);
      });
  })
);

mongoose.connect(process.env.DATABASE_URL).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Success! Server is running on port ${process.env.PORT}`);
  });
});
