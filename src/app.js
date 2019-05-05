const path = require('path');

const hbs = require('hbs');

const geocode = require('./utils/geocode.js');

const forecast = require('./utils/forecast.js');

const express = require('express');

const app = express();

// Define paths

const publicDirectoryPath = path.join(__dirname, '../public');

const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handle bars view engine and view path

app.set('view engine', 'hbs');

app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (request, response) => {

    response.render('index', {

        title : 'About Page',
        author : 'Kranthi'
    })
});

app.get('/weather', (request, response) => {

    if(!request.query.address) {

        return response.send({
            error : "You must provide an address"
        });
    }

    geocode.getLatLong(request.query.address, (error, {location, latitude, longitude} = {}) => {

        if(error) {
    
            return response.send({
                error
            });
    
        }else{
    
            forecast.getForecast(latitude, longitude, (error, {precipProbability, temperature} = {}) => {
    
                if(error) {
    
                    return response.send({
                        error
                    });
    
                }else{

                    response.send({
                        location,
                        precipProbability,
                        temperature
                    });
                }
            });
        }
    });
})

app.get('/help', (request, response) => {
    
    response.render('index.hbs', {
        title : 'Help Page',
        author : 'Riya'
    });

});

app.get('/about', (request, response) => {
    
    response.render('about.hbs', {
        title : 'About Page',
        author : 'Kitty'
    });

});

// This is kept as last route for error handling the unknown routes.
app.get('*', (request, response) => {
    
    response.render('error.hbs', {
        title : 'Error',
        author : 'Kitty',
        errorMessage : 'Page you are searching is not available'
    });
});

app.listen(8888, () => {

    console.log('Server successfully started on port 8888');
});