const { adminPool } = require('./pool')
const { capitalize } = require('../util/capitalize')

/*
=================================================================================================
station management
=================================================================================================
*/

/**
 * 
 * @param {String} name 
 * @param {Double Presision} latitude 
 * @param {Double Presision} longitude 
 * @param {String} contry 
 * @param {String} region 
 * @param {String} city 
 * @param {String} zipcode 
 * @function Registra una estacion con la informacion especificada.
 * @returns Devuelve un objeto con el identificador de la estacion registrada.
 * 
 */
const registerStation = async (name, latitude, longitude, contry, region, city, zipcode) => {
    try {
        const query = `SELECT registerStation($1, $2, $3, $4, $5, $6, $7);`
        const values = [capitalize(name), latitude, longitude, capitalize(contry)
            , capitalize(region), capitalize(city), zipcode.toUpperCase()]
        const response = await adminPool.query(query, values)

        return { stationRegistered: response.rows[0].registerstation }
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} stationId 
 * @function Elimina la estacion especificada.
 * 
 */
const deleteStation = async (stationId) => {
    try {
        const query = `DELETE FROM station WHERE station.id_station=$1;`
        const values = [stationId]
        const response = await adminPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} stationId 
 * @param {String} name 
 * @function Edita el nombre de la estacion especificada.
 * 
 */
const setName = async (stationId, name) => {
    try {
        const query = `UPDATE station SET name_station=$2 WHERE station.id_station=$1;`
        const values = [stationId, capitalize(name)]
        const response = await adminPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} stationId 
 * @returns Devuelve un objeto con el identificador de la localizacion de la estacion especificada.
 * 
 */
const locatedAt = async (stationId) => {
    try {
        const query = `SELECT station.id_location FROM station WHERE station.id_station=$1;`
        const values = [stationId]
        const response = await adminPool.query(query, values)
        const stationNotFound = !response.rows[0]
        
        if (stationNotFound) {
            const err = new Error('Station not found.')
            err.status = 404
            throw err
        }

        return { locationId: response.rows[0].id_location }
    } catch (err) {
        throw err
    }
}


module.exports = {
    registerStation,
    deleteStation,
    setName,
    locatedAt
}