const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const port = process.env.PORT || 3000;

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
    name: "Abdullah",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    message: "This website is created by Muhammad Abdullah. The website uses map api for the geocodes and weatherstack api for the forecast data. ",
    title: "About me",
    name: "Abdullah",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is the help page you are looking for. \n But How can I help you though? ",
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

app.listen(port, () => {
  console.log(`The server is up and running on port ${port}!`);
});
