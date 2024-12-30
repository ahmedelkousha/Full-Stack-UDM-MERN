const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userInfo = require("./models/Users");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get(
  "/",
  (async (req, res) => {
    await userInfo
      .find({})
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        console.log(err);
      });
  })
);

app.get(
  "/getUser/:id",
  (async (req, res) => {
    const id = req.params.id;
    await userInfo
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
  (async (req, res) => {
    const id = req.params.id;
    await userInfo
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
  (async (req, res) => {
    const id = req.params.id;
    await userInfo
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
  (async (req, res) => {
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
