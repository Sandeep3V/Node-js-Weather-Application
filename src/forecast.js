const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=hourly,daily&appid=3acecf6bf012c9471fa3133b483f6929'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, ' It is currently ' + body.current.temp + ' degress out. The weather is ' + body.current.weather[0].description)
        }
    })
}

module.exports = forecast