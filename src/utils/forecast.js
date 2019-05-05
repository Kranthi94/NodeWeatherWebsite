const request = require('request');

const getForecast = (latitude, longitude, callback) => {

    const forecastUrl = "https://api.darksky.net/forecast/06fbce1e9bb507d95b1d4b25d0335cbc/" + latitude + "," + longitude + "?units=si";

    request({url : forecastUrl, json : true}, (error, {body}) => {

        if(body.error) {

            callback(error, undefined);

        }else {

            const forecastData = {

                precipProbability : body.currently.precipProbability,

                temperature : body.currently.temperature
            }

            callback(undefined, forecastData);
        }
    })
};

module.exports = {

    getForecast
}