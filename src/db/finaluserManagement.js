const { finaluserPool } = require('../db/pool')
const { adminPool } = require('../db/pool')
const { capitalize } = require('../util/capitalize')

/*
=================================================================================================
finaluser management
=================================================================================================
*/

/**
 * 
 * @param {String} emailAdress 
 * @returns Devuelve un objeto con el identificador del usuario final con el email especificado.
 * 
 */
const searchFinaluser = async (emailAdress) => {
    try {
        const query = `SELECT finaluser.id_finaluser FROM finaluser 
            WHERE finaluser.email=$1;`
        const values = [emailAdress.toLocaleLowerCase()]
        const response = await finaluserPool.query(query, values)
        const finaluserNotFound = !response.rows[0]
        
        if (finaluserNotFound) {
            const err = new Error('Final user not found.')
            err.status = 404
            throw err
        }

        return { finaluser: response.rows[0] }
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} userId 
 * @returns Devuelve un objeto con el tipo del usuario final con el identificador especificado.
 * 
 */
const getTypeOfUser = async (userId) => {
    try {
        const query = `SELECT getTypeOfUser($1);`
        const values = [userId]
        const response = await adminPool.query(query, values)

        return { finaluser: { type: response.rows[0].gettypeofuser } }
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} finaluserId
 * @param {String} emailAdress
 * @function Edita el email del usuario especificado.
 * 
 */
const setEmail = async (finaluserId, emailAdress) => {
    try {
        const query = `UPDATE finaluser SET email=$2 WHERE finaluser.id_finaluser=$1;`
        const values = [finaluserId, emailAdress.toLowerCase()]
        const response = await finaluserPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} finaluserId 
 * @param {String} username 
 * @function Edita el nombre del usuario especificado.
 * 
 */
const setUsername = async (finaluserId, username) => {
    try {
        const query = `UPDATE finaluser SET username=$2 WHERE finaluser.id_finaluser=$1;`
        const values = [finaluserId, capitalize(username)]
        const response = await finaluserPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} finaluserId 
 * @param {String} profilePicture 
 * @function Edita la URI de la foto del usuario especificado.
 * 
 */
const setProfilePicture = async (finaluserId, profilePicture) => {
    try {
        const query = `UPDATE finaluser SET profile_picture=$2 WHERE finaluser.id_finaluser=$1;`
        const values = [finaluserId, profilePicture.toLowerCase()]
        const response = await finaluserPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} finaluserId 
 * @param {String} birthDate 
 * @function Edita la fecha de nacimiento del usuario especificado.
 * 
 */
const setBirthdate = async (finaluserId, birthdate) => {
    try {
        const query = `UPDATE finaluser SET birthdate=$2 WHERE finaluser.id_finaluser=$1;`
        const values = [finaluserId, birthdate]
        const response = await finaluserPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} finaluserId 
 * @function Devuelve un objeto con la informacion del usuario final especificado.
 * 
 */
const getFinaluser = async (finaluserId) => {
    try {
        const query = `SELECT * FROM finaluser WHERE finaluser.id_finaluser=$1;`
        const values = [finaluserId]
        const response = await finaluserPool.query(query, values)
        const finaluserNotFound = !response.rows[0]
        
        if (finaluserNotFound) {
            const err = new Error('Final user not found.')
            err.status = 404
            throw err
        }
        
        return { finaluser: response.rows[0] }
    } catch (err) {
        throw err
    }
}

module.exports = {
    searchFinaluser,
    getTypeOfUser,
    setEmail,
    setUsername,
    setProfilePicture,
    setBirthdate,
    getFinaluser,
}