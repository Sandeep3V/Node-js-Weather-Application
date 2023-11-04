const express = require("express");
const { registerPartials } = require("hbs");
const forecast = require("./src/forecast")
const geocode = require("./src/geocode")
const app = express();
const hbs = require('hbs');
const publicDirectoryPath = __dirname
const partialsPath = "partials";
hbs.registerPartials(partialsPath)
app.set('view engine', 'hbs')

app.use(express.static(publicDirectoryPath))

const port = process.env.PORT || 3000
app.get('', (req, res) => {
    res.render("index", {
        title: "Stay tuned for more updates",
        footer: "Please follow us!"
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sandeep Vuppala'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sandeep Vuppala'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address,

            })
        })
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sandeep Vuppala',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sandeep Vuppala',
        errorMessage: 'Page not found.'
    })
})

app.listen(port);
