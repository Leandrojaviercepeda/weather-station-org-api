const express = require('express')
const AdminRouter =  express.Router()

const {
    createPlan,
    deletePlan,
    setPrice,
    setAmountConsults,
    setHistoricalData,
    getPlan,
    getPlans,
} = require('../db/planManagement')

const { getLocations,
        stationsThatFailed,
        locationsMoreThanOneStation,
        clientsSuscribedAtPlan,
        customersConsultLastWeek,
        getCustomers
    } = require('../db/admin')

const { searchAdmin } = require('../db/adminManagement')

// Router for get client id searched by email
AdminRouter.get('/admins/searchBy?', async (req, res, next) => {
    try {
        const reqEmail = req.query.email
        
        if (reqEmail) {
            const adminId = await searchAdmin(reqEmail)

            res.status(200).send(JSON.stringify(adminId, null, 2))
        } else 
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})


// Router for get all locations
AdminRouter.get('/manage/locations', async (req, res, next) => {
    try {
        const locations = await getLocations()
        res.status(200).send(JSON.stringify(locations, null, 2))

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get locations with more than station
AdminRouter.get('/manage/locations/more-than-station', async (req, res, next) => {
    try {
        const locations = await locationsMoreThanOneStation()
        res.status(200).send(JSON.stringify(locations, null, 2))

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get stations that failed at least once
AdminRouter.get('/manage/stations/thath-failed', async (req, res, next) => {
    try {
        const stations = await stationsThatFailed()
        res.status(200).send(JSON.stringify(stations, null, 2))

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get a especific plan
AdminRouter.get('/manage/plans/:description', async (req, res, next) => {
    try {
        const reqDescription = req.params.description
        if (reqDescription) {
            const plan = await getPlan(reqDescription)
            res.status(200).send(JSON.stringify(plan, null, 2))
        }

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get all plans
AdminRouter.get('/manage/plans', async (req, res, next) => {
    try {
        const plans = await getPlans()
        res.status(200).send(JSON.stringify(plans, null, 2))

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for post new plan
AdminRouter.post('/manage/plans', async (req, res, next) => {
    try {
        const reqDescription = req.body.description
        const reqPrice = req.body.price
        const reqAmountConsults = req.body.amountConsults
        const reqHistoricalData = req.body.historicalData

        if (reqDescription && reqPrice && reqAmountConsults && reqHistoricalData) {
            await createPlan(reqDescription ,reqPrice, reqAmountConsults, reqHistoricalData)
            res.status(201).send()
        } else
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for put plan
AdminRouter.put('/manage/plans/:description', async (req, res, next) => {
    try {
        const reqDescription = req.params.description
        const reqPrice = req.body.price
        const reqAmountConsults = req.body.amountConsults
        const reqHistoricalData = req.body.historicalData

        if (reqDescription) {
            if (reqPrice)
                await setPrice(reqDescription ,reqPrice)
            
            if (reqDescription && reqAmountConsults)
                await setAmountConsults(reqDescription, reqAmountConsults)
            
            if (reqDescription && reqHistoricalData)
                await setHistoricalData(reqDescription, reqHistoricalData)
            
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

// Router for delete plan
AdminRouter.delete('/manage/plans/:description', async (req, res, next) => {
    try {
        const reqDescription = req.params.description

        if (reqDescription) {
            await deletePlan(reqDescription)
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

// Router for get clients suscribed at plan
AdminRouter.get('/manage/clients/suscribedAt?', async (req, res, next) => {
    try {
        const reqPlan = req.query.plan

        if (reqPlan) {
            const clients = await clientsSuscribedAtPlan(reqPlan)

            res.status(200).send(JSON.stringify(clients, null, 2))
        } else 
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get customers consults last week
AdminRouter.get('/manage/clients/made-inquiries-last-week', async (req, res, next) => {
    try {
        const clients = await customersConsultLastWeek()
        res.status(200).send(JSON.stringify(clients, null, 2))

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get customers consults last week
AdminRouter.get('/manage/clients', async (req, res, next) => {
    try {
        const clients = await getCustomers()
        res.status(200).send(JSON.stringify(clients, null, 2))

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})


module.exports = { AdminRouter }