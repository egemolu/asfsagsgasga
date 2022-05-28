const express = require("express");
const port = 8080;
const app = express();
const crypto = require("crypto");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const strHashMap = new Map();

app.listen(port, () => {
  console.log("Server is up");
});

app.post("/messages/", (req, res) => {
  const str = req.body.str;
  if (!str) {
    res.status(418).send({ message: "Input is missing" });
  }
  hashed = crypto.createHash("sha256").update(str).digest("hex");
  strHashMap.set(hashed, str);
  console.log(strHashMap);
  res.send({ sha: hashed });
});

app.get("/messages/:hash", (req, res) => {
  const hashed = req.params.hash;
  if (!hashed) {
    res.status(418).send({ message: "Input is missing" });
  }
  if (strHashMap.get(hashed)) {
    const str = strHashMap.get(hashed);
    res.send({ str: str });
  } else {
    res.status(404).send({ message: "Wrong Hash!!" });
  }
});
