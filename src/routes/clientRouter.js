const express = require('express')
const ClientRouter =  express.Router()

const { searchClient,
        signUp,
        deleteAccount,
        getClient,
        upgradePlan,
        suscribedToPlan,
        getAilableConsults,
        generateApikey,
        deleteApikey,
        renameApikey,
        getApikeys,
        notifyClient
    } = require('../db/clientManagement')

/*
=================================================================================================
client routes
=================================================================================================
*/

// Router for get client id searched by email
ClientRouter.get('/clients/searchBy?', async (req, res, next) => {
    try {
        const reqEmail = req.query.email
        
        if (reqEmail) {
            const clientId = await searchClient(reqEmail)

            res.status(200).send(JSON.stringify(clientId, null, 2))
        } else 
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for post a client
ClientRouter.post('/clients', async (req, res, next) => {
    try {
        const reqEmail = req.body.email
        const reqUsername = req.body.username
        const reqProfilePicture = req.body.profilePicture
        
        if (reqEmail || reqUsername) {
            await signUp(reqEmail, reqUsername, reqProfilePicture)

            res.status(201).send()
        } else 
            next()

    } catch (error) {
        switch (error.code) {
            case '23505': return next(Object.assign({}, error, { message: 'El cliente ya fue registrado' }))
            default:
                return next(error);
        }
    }
})

// Router for delete a client account
ClientRouter.delete('/clients/:id', async (req, res, next) => {
    try {
        const reqClientId = req.params.id

        if (reqClientId) {
            await deleteAccount(reqClientId)

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

// Router for get client data
ClientRouter.get('/clients/:id', async (req, res, next) => {
    try {
        const reqClientId = req.params.id
        
        if (reqClientId) {
            const client = await getClient(reqClientId)

            res.status(200).send(JSON.stringify(client, null, 2))
        } else 
            next()

    } catch (err) {
        const error = new Error()
        error.status = 400
        error.message = err.message
        return next(error)
    }
})

// Router for upgrade plan
ClientRouter.put('/clients/:id', async (req, res, next) => {
    try {
        const reqClientId = req.params.id
        const reqPlanToSuscribe = req.body.plantosuscribe
        
        if (reqClientId && reqPlanToSuscribe) {
            await upgradePlan(reqClientId, reqPlanToSuscribe)

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

// Router for get plan suscribed
ClientRouter.get('/clients/:id/plan-suscribed', async (req, res, next) => {
    try {
        const reqClientId = req.params.id

        if (reqClientId) {
            const plan = await suscribedToPlan(reqClientId)

            res.status(200).send(JSON.stringify(plan, null, 2))
        } else 
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get available consults
ClientRouter.get('/clients/:id/available-consults', async (req, res, next) => {
    try {
        const reqClientId = req.params.id

        if (reqClientId) {
            const availableConsults = await getAilableConsults(reqClientId)

            res.status(200).send(JSON.stringify(availableConsults, null, 2))
        } else 
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for post a apikey
ClientRouter.post('/clients/:id/apikeys', async (req, res, next) => {
    try {
        const reqClientId = req.params.id
        const reqApikeyName = req.body.apikeyname

        if (reqClientId && reqApikeyName) {
            await generateApikey(reqClientId, reqApikeyName)

            res.status(201).send()
        } else 
            next()

    } catch (err) {
        const error = new Error()
        error.status = 400
        error.message = err.message
        return next(error)
    }
})

// Router for put a apikey
ClientRouter.put('/clients/:id/apikeys/:appid', async (req, res, next) => {
    try {
        const reqClientId = req.params.id
        const reqApikeyId = req.params.appid
        const reqApikeyName = req.body.apikeyname

        if (reqClientId && reqApikeyId && reqApikeyName) {
            await renameApikey(reqClientId, reqApikeyId, reqApikeyName)

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

// Router for delete a apikey
ClientRouter.delete('/clients/:id/apikeys/:appid', async (req, res, next) => {
    try {
        const reqClientId = req.params.id
        const reqApikeyId = req.params.appid

        if (reqClientId && reqApikeyId) {
            await deleteApikey(reqClientId, reqApikeyId)

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

// Router for get apikeys
ClientRouter.get('/clients/:id/apikeys', async (req, res, next) => {
    try {
        const reqClientId = req.params.id

        if (reqClientId) {
            const apikeys = await getApikeys(reqClientId)

            res.status(200).send(JSON.stringify(apikeys, null, 2))
        } else 
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for notify clients
ClientRouter.get('/clients/:id/notify', async (req, res, next) => {
    try {
        const reqClientId = req.params.id

        if (reqClientId) {
            await notifyClient(reqClientId)
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


module.exports = { ClientRouter }
