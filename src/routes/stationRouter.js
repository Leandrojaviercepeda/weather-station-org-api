const express = require('express')
const StationRouter =  express.Router()

const { getStations,
        getStationdataBetweenDates,
        getStationdataById,
        getStationdataByPlace,
        getStationdataByGeolocation,
        getStationdataByZipcode
    } = require('../db/finaluser')

const { registerStation,
        deleteStation,
        setName,
        locatedAt
    } = require('../db/stationManagement')

const { setLatitude,
        setLongitude,
        setCountry,
        setRegion,
        setCity,
        setZipcode,
    } = require('../db/locationManagement')

/*
=================================================================================================
stations routes
=================================================================================================
*/


// Router for get all stations with data
StationRouter.get('/stations?', async (req, res, next) => {
    try {
        const reqLimit = req.query.limit
        const stations = await getStations(reqLimit)
        res.status(200).send(JSON.stringify(stations, null, 2))

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get stations data between dates of creation
StationRouter.get('/stations/createdAt?', async (req, res, next) => {
    try {
        const reqStartDate = req.query.startdate
        const reqEndDate = req.query.enddate
        const reqLimit = req.query.limit
        
        if (reqStartDate && reqEndDate) {
            const stations = await getStationdataBetweenDates(reqStartDate, reqEndDate, reqLimit)

            res.status(200).send(JSON.stringify(stations, null, 2))
        } else 
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get data by geolocation
StationRouter.get('/stations/locatedAt?', async (req, res, next) => {
    try {
        const reqLatitude = req.query.latitude
        const reqLongitude = req.query.longitude

        if (reqLatitude && reqLongitude) {
            const station = await getStationdataByGeolocation(reqLatitude, reqLongitude)

            res.status(200).send(JSON.stringify(station, null, 2))
        } else
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get stations data by place
StationRouter.get('/stations/locatedAt?', async (req, res, next) => {
    try {
        const reqRegion = req.query.region
        const reqCity = req.query.city
        const reqLimit = req.query.limit

        if (reqRegion && reqCity) {
            const stations = await getStationdataByPlace(reqRegion, reqCity, reqLimit)

            res.status(200).send(JSON.stringify(stations, null, 2))
        } else
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get stations data by zipcode
StationRouter.get('/stations/locatedAt?', async (req, res, next) => {
    try {       
        const reqZipcode = req.query.zipcode
        const reqLimit = req.query.limit

        if (reqZipcode) {
            const stations = await getStationdataByZipcode(reqZipcode, reqLimit)

            res.status(200).send(JSON.stringify(stations, null, 2))
        } else
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get data by id station
StationRouter.get('/stations/:id', async (req, res, next) => {
    try {
        const reqIdStation = req.params.id

        if (reqIdStation) {
            const station = await getStationdataById(reqIdStation)

            res.status(200).send(JSON.stringify(station, null, 2))
        } else
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for post a station
StationRouter.post('/stations', async (req, res, next) => {
    try {
        const reqName = req.body.name
        const reqLatitude = req.body.latitude
        const reqLongitude = req.body.longitude
        const reqCountry = req.body.country
        const reqRegion = req.body.region
        const reqCity = req.body.city
        const reqZipcode = req.body.zipcode

        if (reqName && reqLatitude && reqLongitude &&
            reqCountry && reqCountry && reqRegion &&
            reqCity && reqZipcode) {
            const stationRegistered = await registerStation(reqName ,reqLatitude, reqLongitude, 
                reqCountry, reqRegion, reqCity, reqZipcode)

            res.status(201).send(JSON.stringify(stationRegistered, null, 2))
        } else
            next()

    } catch (err) {
        const error = new Error()
        error.status = 400
        error.message = err.message
        return next(error)
    }
})

// Router for delete a station
StationRouter.delete('/stations/:id', async (req, res, next) => {
    try {
        const reqStationId = req.params.id             
        
        if (reqStationId) {
            await deleteStation(reqStationId)

            res.status(200).send()
        } else
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for put a station
StationRouter.put('/stations/:id', async (req, res, next) => {
    try {
        const reqStationId = req.params.id
        const reqName = req.body.name
        const reqLatitude = req.body.latitude
        const reqLongitude = req.body.longitude
        const reqCountry = req.body.country
        const reqRegion = req.body.region
        const reqCity = req.body.city
        const reqZipcode = req.body.zipcode

        if (reqName || reqLatitude || reqLongitude || reqCountry ||
                reqRegion || reqCity || reqZipcode) {

            const { locationId } = await locatedAt(reqStationId)

            if (reqName)
                await setName(reqStationId, reqName)

            if (reqLatitude)
                await setLatitude(locationId, reqLatitude)

            if (reqLongitude)
                await setLongitude(locationId, reqLongitude)

            if (reqCountry)
                await setCountry(locationId, reqCountry)

            if (reqRegion)
                await setRegion(locationId, reqRegion)

            if (reqCity)
                await setCity(locationId, reqCity)

            if (reqZipcode)
                await setZipcode(locationId, reqZipcode)
        
            res.status(200).send()
        } else
            next()

    } catch (err) {
        const error = new Error()
        error.status = 400
        error.message = err.message
        return next(error)
    }
})

module.exports = { StationRouter }