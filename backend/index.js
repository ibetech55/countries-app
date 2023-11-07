require('dotenv').config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const data = require("./data.json");
const expressFileUpload = require("express-fileupload");
const fs = require("fs");
const uuid = require("uuid").v4;

const app = express();

app.use(cors({ origin: [process.env.FRONTEND_URL] }));
app.use(express.json());
app.use(expressFileUpload());

app.use("/api/images", express.static(path.join(__dirname, "Images")));

function compare(a, b) {
  if (a.countryName < b.countryName) {
    return -1;
  }
  if (a.countryName > b.countryName) {
    return 1;
  }
  return 0;
}

app.get("/api/countries", (req, res) => {
  let countriesData;
  const countriesDataStream = fs.createReadStream(__dirname + "/data.json");

  countriesDataStream.on("data", function (chunk) {
    countriesData = JSON.parse(chunk);
    countriesData.sort(compare);
    return res.status(200).json(countriesData);
  });
});

app.post("/api/countries", (req, res) => {
  const countriesDataStream = fs.createReadStream(__dirname + "/data.json");
  const newData = req.body;
  const countryDemonym = req.body.demonym;
  newData.oficialLanguage = [req.body.oficialLanguage];

  const flagName = `${countryDemonym}-flag.png`.toLowerCase();
  req.files.flag.mv(`Images/${flagName}`);

  const countryMapName = `${countryDemonym}-map.png`.toLowerCase();
  req.files.countryMap.mv(`Images/${countryMapName}`);

  const presidentImageName = `${countryDemonym}-president.png`.toLowerCase();
  req.files.presidentImage.mv(`Images/${presidentImageName}`);

  const coatOfArmsName = `${countryDemonym}-coa.png`.toLowerCase();
  req.files.coatOfArms.mv(`Images/${coatOfArmsName}`);

  countriesDataStream.on("data", function (chunk) {
    const countriesData = JSON.parse(chunk);
    newData.id = uuid();
    newData.flag = flagName;
    newData.countryMap = countryMapName;
    newData.presidentImage = presidentImageName;
    newData.coatOfArms = coatOfArmsName;
    const newCountriesData = [...countriesData, { ...newData }];
    const myWriteStream = fs.createWriteStream(__dirname + "/data.json");
    myWriteStream.write(JSON.stringify(newCountriesData));
    return res.status(200).json(newData);
  });
});

app.get("/api/country/:id", (req, res) => {
  const { id } = req.params;

  const sentData = data.find((x) => x.id === id);
  return res.status(200).json(sentData);
});

app.post("/api/admin-access", (req, res) => {
  const { password } = req.body;

  if (password === "111111") {
    return res.status(200).json(true);
  }
  return res.status(400).json(false);
});

app.listen(5000, console.log("Connected to port 5000"));
