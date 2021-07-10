const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

// Server Setup
const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express Config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

title = 'Weather App'
name = 'Alex'

// Setup Handlebars Engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// Setup Static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title,
        pagename: 'Home',
        name,
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title,
        pagename: 'About',
        name,
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title,
        pagename: 'Help',
        name,
        helptext: 'This is help text',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!',
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                Error: error,
            })
        }
        forecast(latitude, longitude, (error, { temperature, feelslike, precipitation, humidity } = {}) => {
            if (error) {
                return res.send({
                    Error: error,
                })
            }
            res.send({
                location,
                temperature,
                feelslike,
                precipitation,
                humidity,
                address: req.query.address,
            })
        })
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term',
        })
    }

    console.log(req.query.search)
    res.send({
        product: 'Success',
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title,
        pagename: 'Help Page Error',
        name,
        errortext: 'This Help page does not exist.',
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title,
        pagename: 'Error 404',
        name: 'Alex',
        errortext: 'This page does not exist.',
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
