const request = require("request");

const geocode = (address, callback) => {
  const options = {
    method: "GET",
    url: "https://forward-reverse-geocoding.p.rapidapi.com/v1/forward",
    qs: {
      format: "json",
      city: address,
      "accept-language": "en",
    },
    headers: {
      "X-RapidAPI-Key": "d3f8a93186mshf6a74ec48ff66b6p133358jsnc7e623524446",
      "X-RapidAPI-Host": "forward-reverse-geocoding.p.rapidapi.com",
    },
  };

  request(options, (error, {body}) => {
    const data = JSON.parse(body);
    if (error) {
      callback("Unable to connect with location services", undefined);
    } else if (data.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: data[0].lat,
        longitude: data[0].lon,
        location: data[0].display_name,
      });
    }
  });
};

module.exports = geocode;
