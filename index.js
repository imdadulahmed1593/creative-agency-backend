//importing

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

import {
  serviceCollection,
  reviewCollection,
  orderCollection,
} from "./creativeAgencyDB.js";
import cors from "cors";

//app config
const app = express();
const port = 8080;

//database config
const connection_url =
  "mongodb+srv://creativeAdmin:iXmM17SKH6JLkzgi@cluster0.2jzrg.mongodb.net/creativeAgencyDB?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("db connected");
});

// middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//api endpoints
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/services", (req, res) => {
  serviceCollection.find({}, (err, docs) => {
    res.send(docs);
  });
});

app.get("/reviews", (req, res) => {
  reviewCollection.find({}, (err, docs) => {
    res.send(docs);
  });
});

app.get("/orders", (req, res) => {
  orderCollection.find({}, (err, docs) => {
    res.send(docs);
  });
});

app.get("/orders/sync", (req, res) => {
  orderCollection.find({ clientName: req.query.name }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/services", (req, res) => {
  const service = req.body;
  serviceCollection.create(service, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/reviews", (req, res) => {
  const review = req.body;
  reviewCollection.create(review, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post("/orders/new", (req, res) => {
  const order = req.body;

  orderCollection.create(order, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

//listener
app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// nodemon --experimental-modules index.js
