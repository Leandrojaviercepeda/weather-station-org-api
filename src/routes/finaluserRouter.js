const express = require('express')
const FinaluserRouter =  express.Router()

const { searchFinaluser,
        getTypeOfUser,
        setEmail,
        setUsername,
        setProfilePicture,
        setBirthdate,
        getFinaluser,
    } = require('../db/finaluserManagement')

/*
=================================================================================================
finaluser routes
=================================================================================================
*/

// Router for get finalusers id searched by email
FinaluserRouter.get('/finalusers/searchBy?', async (req, res, next) => {
    try {
        const reqEmail = req.query.email
        
        if (reqEmail) {
            const finaluser = await searchFinaluser(reqEmail)

            res.status(200).send(JSON.stringify(finaluser, null, 2))
        } else 
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

// Router for get type of finaluser searched by id
FinaluserRouter.get('/finalusers/:id/type', async (req, res, next) => {
    try {
        const reqFinaluserId = req.params.id
        
        if (reqFinaluserId) {
            const finaluser = await getTypeOfUser(reqFinaluserId)

            res.status(200).send(JSON.stringify(finaluser, null, 2))
        } else 
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})

//Router for put a finaluser
FinaluserRouter.put('/finalusers/:id', async (req, res, next) => {
    try {
        const reqFinaluserId = req.params.id
        const reqEmail = req.body.email
        const reqUsername = req.body.username
        const reqPofilePicture = req.body.profilepicture
        const reqBirhdate = req.body.birhdate        

        if (reqFinaluserId || reqEmail || password || 
            username || reqBirhdate || reqBirhdate) {

            if (reqEmail)
                await setEmail(reqFinaluserId, reqEmail)

            if (reqUsername)
                await setUsername(reqFinaluserId, reqUsername)

            if (reqPofilePicture)
                await setProfilePicture(reqFinaluserId, reqPofilePicture)

            if (reqBirhdate)
                await setBirthdate(reqFinaluserId, reqBirhdate)
        
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

// Router for get finaluser data
FinaluserRouter.get('/finalusers/:id', async (req, res, next) => {
    try {
        const reqFinaluserId = req.params.id       
        
        if (reqFinaluserId) {
            const finaluser = await getFinaluser(reqFinaluserId)

            res.status(200).send(JSON.stringify(finaluser, null, 2))
        } else 
            next()

    } catch (err) {
        const error = new Error()
        error.status = 404
        error.message = err.message
        return next(error)
    }
})


module.exports = { FinaluserRouter }