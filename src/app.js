const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../../weather-app/utils/geocode");
const forecost = require("../../weather-app/utils/forecast");

const app = express();

const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    creator: "Balakumar A N",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Weather App",
    creator: "Balakumar A N",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help / Support Page",
    message: "Example message for help page",
    creator: "Balakumar A N",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: "You must provide a address",
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecost(latitude, longitude, (error, forecast) => {
      if (error) {
        return res.send({ error });
      }

      return res.send({
        forecast,
        location,
        address,
      });
    });
  });
});

app.get("/help", (req, res) => {
  res.send("Help Page");
});

app.get("/about", (req, res) => {
  res.send("<h1 style='color:#555'>About Page</h1>");
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    creator: "Bala",
    message: "No help article found!",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    creator: "Bala",
    message: "Page Not Found!",
  });
});

app.listen(3000, () => console.log("Server is running at port 3000"));
