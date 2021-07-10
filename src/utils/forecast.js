const request = require('postman-request')

const forecast = (lat, long, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=711140c5549595081aa5b3840a9ac558&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '&units=f'
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to the weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                precipitation: body.current.precip,
                humidity: body.current.humidity
            })
        }

    })
}

module.exports = forecast