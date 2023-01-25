const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=ae65ce07447f3eade1eface4e19b43ac&query=${encodeURIComponent(
    latitude + "," + longitude
  )}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather service", undefined);
    } else if (body.error) {
      callback("Unable to find the location", undefined);
    } else {
      const data = body.current;

      callback(
        undefined,
        `${data.weather_descriptions[0]}, It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degress out. The humidity is ${data.humidity}%`
      );
    }
  });
};

module.exports = forecast;
