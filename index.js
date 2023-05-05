const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const path = require("path");
const fetch = require("node-fetch");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const getCity = async () => {
  try {
    const res = await fetch("http://localhost:3005/city");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return "error";
  }
};

const getAdj = async () => {
  try {
    const res = await fetch("http://localhost:3010/adj");

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return "error";
  }
};

app.get("/", async (req, res) => {
  let city;
  let adj;
  city = await getCity();
  console.log(city.name);
  adj = await getAdj();
  console.log(adj);

  if (city === "error" || adj === "error") {
    return res.status(500).json("Something went wrong");
  }
  res.status(200).json(`${city[0].name} is ${adj[0].adj}.`);
});

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
