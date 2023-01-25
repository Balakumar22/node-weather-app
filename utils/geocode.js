const request = require("postman-request");

const geoCode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=032dc0ba05a6bf05eb6c46d253371b6d&query=${encodeURIComponent(
    address
  )}&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect positional service", undefined);
    } else if (!body.data || body.data.length === 0) {
      callback("Unable to find the location. Try another search", undefined);
    } else {
      const { data } = body;

      callback(undefined, {
        latitude: data[0].latitude,
        longitude: data[0].longitude,
        location: data[0].label,
      });
    }
  });
};

module.exports = geoCode;
