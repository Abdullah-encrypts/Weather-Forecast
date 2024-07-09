const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const path = require("path");
const express = require("express");
const hbs = require("hbs");

// setting paths
const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// setting up viewengine and new views path
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Draven",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Abdullah",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "HELP MEEEEEEEEEEEEEEEEEEEEEEE I AM STUCK AS A CODER >>>>>>>>>>>>",
    title: "Help",
    name: "Abdullah",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Abdullah",
    errorMessage: "Help article not found!",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "User must provide the address!",
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
    if (error) {
      return res.send({error});
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({error});
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });

});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Must provide a search query",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Abdullah",
    errorMessage: "Page not found!",
  });
});

app.listen(3000, () => {
  console.log("The server is up and running!");
});
