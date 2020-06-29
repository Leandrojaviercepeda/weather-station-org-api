const { adminPool } = require('./pool')
const { capitalize } = require('../util/capitalize')

/*
=================================================================================================
location management
=================================================================================================
*/

/**
 * 
 * @param {String} locationId 
 * @param {Double Presision} latitude 
 * @function Edita el la latitud de la localizacion especificada.
 * 
 */
const setLatitude = async (locationId, latitude) => {
    try {
        const query = `UPDATE location SET latitude=$2 WHERE location.id_location=$1;`
        const values = [locationId, latitude]
        const response = await adminPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} locationId 
 * @param {Double Presision} longitude 
 * @function Edita el la longitud de la localizacion especificada.
 * 
 */
const setLongitude = async (locationId, longitude) => {
    try {
        const query = `UPDATE location SET longitude=$2 WHERE location.id_location=$1;`
        const values = [locationId, longitude]
        const response = await adminPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} locationId 
 * @param {String} country 
 * @function Edita el pais de la localizacion especificada.
 * 
 */
const setCountry = async (locationId, country) => {
    try {
        const query = `UPDATE location SET country=$2 WHERE location.id_location=$1;`
        const values = [locationId, capitalize(country)]
        const response = await adminPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} locationId 
 * @param {String} region 
 * @function Edita la region de la localizacion especificada.
 * 
 */
const setRegion = async (locationId, region) => {
    try {
        const query = `UPDATE location SET region=$2 WHERE location.id_location=$1;`
        const values = [locationId, capitalize(region)]
        const response = await adminPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} locationId 
 * @param {String} city 
 * @function Edita la ciudad de la localizacion especificada.
 * 
 */
const setCity = async (locationId, city) => {
    try {
        const query = `UPDATE location SET city=$2 WHERE location.id_location=$1;`
        const values = [locationId, capitalize(city)]
        const response = await adminPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} locationId 
 * @param {String} zipcode 
 * @function Edita el codigo de area de la localizacion especificada.
 * 
 */
const setZipcode = async (locationId, zipcode) => {
    try {
        const query = `UPDATE location SET zip_code=$2 WHERE location.id_location=$1;`
        const values = [locationId, zipcode.toUpperCase()]
        const response = await adminPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} locationId 
 * @returns Devuelve un objeto con los datos de la localizacion especificada.
 * 
 */
const getLocation = async (locationId) => {
    try {
        const query = `SELECT * FROM location WHERE location.id_location=$1;`
        const values = [locationId]
        const response = await adminPool.query(query, values)

        return { location: response.rows[0] }
    } catch (err) {
        throw err
    }
}


module.exports = {
    setLatitude,
    setLongitude,
    setCountry,
    setRegion,
    setCity,
    setZipcode,
    getLocation,
}
