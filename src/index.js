// // // const notes = require('./utility');
// // // const yargs = require('yargs');
// // // const ch = require('chalk');
// // // yargs.command({
// // //     command: "add",
// // //     describe: "Add a new task",
// // //     builder: {
// // //         title: {
// // //             describe: "Note title",
// // //             demandOption: true,
// // //             type: 'string'
// // //         },
// // //         body: {
// // //             describe: "Note body",
// // //             demandOption: true,
// // //             type: "string"
// // //         }
// // //     },
// // //     handler: function(argv) {
// // //         notes.addNotes(argv.title, argv.body)
// // //     }
// // // })
// // // yargs.command({
// // //     command: "remove",
// // //     describe: "Remove a new task",
// // //     builder: {
// // //         title: {
// // //             describe: "Remove note",
// // //             demandOption: true,
// // //             type: "string"
// // //         }



//const { response } = require("express");

// // //     },
// // //     handler: function(argv) {

// // //         notes.removeNote(argv.title)

// // //     }
// // // })
// // // yargs.command({
// // //     command: "list",
// // //     describe: "Listing tasks",
// // //     handler: function() {
// // //         notes.readNotes()
// // //     }
// // // })
// // // yargs.command({
// // //     command: "read",
// // //     describe: "Reading a task",
// // //     builder: {
// // //         title: {
// // //             describe: "Displaing task",
// // //             demandOption: true,
// // //             type: 'string'
// // //         }
// // //     },

// // //     handler: function(argv) {
// // //         notes.readingNotes(argv.title)
// // //     }
// // // })
// // // console.log(yargs.argv);
// // const request = require('request');
// // const url1 = "https://api.openweathermap.org/data/2.5/onecall?lat=34.0544&lon=-118.2439&exclude=hourly,daily&appid=3acecf6bf012c9471fa3133b483f6929";
// // const url2 = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2FuZGVlcDN2IiwiYSI6ImNrdjJlZ2lkODE1aWozMXExbHExdzAyNGMifQ.JQ3gdtK749Z8LbafGxooCg";
// // request({ url: url2, json: true }, function(error, response) {
// //     const longitude = response.body.features[0].center[0];
// //     const latitude = response.body.features[0].center[1];
// //     console.log(longitude)
// //     console.log(latitude)
// //     const u = "https: //api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=hourly,daily&appid=3acecf6bf012c9471fa3133b483f6929";
// //     setTimeout(() => { getWeather(u) }, 0)

// // });

// // getWeather = (u) => {

// //     request({ url: u, json: true }, function(error, response) {

// //         const a = response.body.alerts[0].description;
// //         console.log("Governent had given a warning as " + a + ".");

// //         // console.log("The weather is " + response.body.weather.main + " with " + response.body.current.weather.description)
// //     })
// // }

// const express = require("express");
// const { registerPartials } = require("hbs");
// const forecast = require("./src/forecast")
// const geocode = require("./src/geocode")
// const app = express();
// const hbs = require('hbs');
// const publicDirectoryPath = __dirname
// const partialsPath = "partials";
// hbs.registerPartials(partialsPath)
// app.set('view engine', 'hbs')

// app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.render("index", {
//         title: "Hellaluah!",
//         footer: "Praise the Lord!"
//     })
// })
// app.get('/weather', (req, res) => {
//     if (!req.query.address) {
//         return res.send({
//             error: "Please enter the address"
//         })

//     }

//     console.log(req.query.address);

//     geocode(req.query.address, (error, { latitude, longitude, location }) => {

//         if (error) {
//             return req.send({ error })
//         }
//         console.log({
//             latitude: latitude,
//             longitude: longitude
//         })
//         forecast(latitude, longitude, (error, forecastData) => {
//             if (error) {
//                 return res.send({ error })
//             }
//             // const a = JOSN.parse(forecastData)
//             //console.log(a)
//             res.send({
//                 forecast: forecastData,

//                 address: req.query.address
//             })
//         })
//     })



// })
// app.get('/about', (req, res) => {
//     res.render("about", {
//         title: "Namaste About!"
//     })
// })
// app.get('*', (req, res) => {
//     res.render("404", {
//         title: "Page not Found and please check out URL"
//     })
// })
// app.listen(3000);


const weather = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const messageThree = document.querySelector("#message-3")

messageOne.textContent = "Loading";
messageTwo.textContent = "";
messageThree.textContent = "";



weather.addEventListener('submit', (e) => {
    messageOne.textContent = ''
    const locations = search.value;
    e.preventDefault()
    if (locations === '') { return messageThree.textContent = "Please enter valid search" }

    fetch('/weather?address=' + locations).then((response) => {
        response.json().then((data) => {
            if (data.error) {

                messageOne.textContent = data.error
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast

        })
    })

})