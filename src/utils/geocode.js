const request = require('request');

const getLatLong = (address, callback) => {

    const geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1Ijoia3JhbnRoaTk0IiwiYSI6ImNqdjVlcG45ZjBzMGwzeW56eHIzZzE4NWMifQ.menJxKgOKKlZM1PhBhjrNw&limit=1"

    request({url : geoCodeUrl, json : true}, (error, {body}) => {

        if(error) {

            callback(error, undefined);
            
        }else if(body.features.length === 0) {

            callback('Unable to find the location', undefined);

        }else{

            const data = {

                location : body.features[0].place_name,

                latitude : body.features[0].geometry.coordinates[1],

                longitude : body.features[0].geometry.coordinates[0]
            }

            callback(undefined, data);
        }
    });
}

module.exports = {

    getLatLong
}