const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=3a42d8fe5074366a0d207c93918eb408&query=-${encodeURIComponent(
    longitude
  )},${encodeURIComponent(latitude)}&units=f`;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("Unable to connect with weather service!", undefined);
    } else if (body.error) {
      callback("Couldn't find the location", undefined);
    } else {
      callback(
        undefined,
        `The weather is ${body.current.weather_descriptions[0]}, the temperature is ${body.current.temperature}°C and feels like ${body.current.feelslike}°C.The humidity is around ${body.current.humidity}. The UV index is at ${body.current.uv_index}.`
      );
    }
  });
};

module.exports = forecast;
