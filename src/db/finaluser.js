const { finaluserPool } = require('../db/pool')

/*
=================================================================================================
manage stations
=================================================================================================
*/


/**
 * 
 * @param {Integer} amount
 * @returns Devuelve un objeto con una lista de estaciones.
 * 
 */
const getStations = async (amount) => {
    try {
        const query = 'SELECT * FROM getStations($1) \
        AS stationdata(id varchar, name varchar, fail bool, created_at timestamp, \
            lat double precision, lon double precision, country varchar, \
            region varchar, city varchar, zipcode varchar);'
        const values = [amount]
        const response = await finaluserPool.query(query, values)
    
        return { stations: response.rows }
    } catch(err){
        throw err
    }
}


/**
 * 
 * @param {Date} startDate 
 * @param {Date} endDate
 * @param {Integer} amount
 * @returns Devuelve un objeto con una lista de estaciones
 *          que se hayan creado en el intervalo de fechas
 *          [endDate; startDate].
 * 
 */
const getStationdataBetweenDates = async (startDate, endDate, amount) => {
    try {
        const query = 'SELECT * FROM getStationdataBetweenDates($1, $2, $3) \
        AS stationdata(id varchar, name varchar, fail bool, created_at timestamp, \
            lat double precision, lon double precision, country varchar, \
            region varchar, city varchar, zipcode varchar);'
        const values = [startDate, endDate, amount]
        const response = await finaluserPool.query(query, values)
    
        return { stations: response.rows }
    } catch(err){
        throw err
    }
}

/**
 * 
 * @param {String} idStation
 * @returns Devuelve un objeto con la informacion de la estacion especificada.
 * 
 */
const getStationdataById = async (idStation) => {
    try {
        const query = 'SELECT * FROM getStationdataById($1) \
        AS stationdata(id varchar, name varchar, fail bool, created_at timestamp, \
            lat double precision, lon double precision, country varchar, \
            region varchar, city varchar, zipcode varchar);'
        const values = [idStation]
        const response = await finaluserPool.query(query, values)
    
        return { station: response.rows[0] }
    } catch(err) {
        throw err
    }
}

/**
 * 
 * @param {String} region 
 * @param {String} city 
 * @param {Integer} amount
 * @returns Devuelve un objeto con una lista de estaciones ubicadas
 *          en la region y ciudad recibidas especificadas.
 * 
 */
const getStationdataByPlace = async (region, city, amount) => {
    try {
        const query = 'SELECT * FROM getStationdataByPlace($1, $2, $3) \
        AS stationdata(id varchar, name varchar, fail bool, created_at timestamp, \
            lat double precision, lon double precision, country varchar, \
            region varchar, city varchar, zipcode varchar);'
        const values = [region, city, amount]
        const response = await finaluserPool.query(query, values)
        
        return { station: response.rows[0] }
    } catch(err) {
        throw err
    }
}

/**
 * 
 * @param {Double Presision} latitude 
 * @param {Double Presision} longitude 
 * @returns Devuelve la informacion de la estacion ubicada en la latitud
 *          y longitud especificadas.
 * 
 */
const getStationdataByGeolocation = async (latitude, longitude) => {
    try {
        const query = 'SELECT * FROM getStationdataByGeolocation($1, $2) \
        AS stationdata(id varchar, name varchar, fail bool, created_at timestamp, \
            lat double precision, lon double precision, country varchar, \
            region varchar, city varchar, zipcode varchar);'
        const values = [latitude, longitude]
        const response = await finaluserPool.query(query, values)
        
        return { station: response.rows[0] }
    } catch(err) {
        throw err
    }
}

/**
 * 
 * @param {String} zipcode 
 * @param {Integer} amount 
 * @returns Devuelve un ubjeto con una lista de estaciones ubicadas en la region
 *          con el codigo especificado.
 * 
 */
const getStationdataByZipcode = async (zipcode, amount) => {
    try {
        const query = 'SELECT * FROM getStationdataByZipcode($1, $2) \
        AS stationdata(id varchar, name varchar, fail bool, created_at timestamp, \
            lat double precision, lon double precision, country varchar, \
            region varchar, city varchar, zipcode varchar);'
        const values = [zipcode, amount]
        const response = await finaluserPool.query(query, values)
        
        return { stations: response.rows }
    } catch(err) {
        throw err
    }
}


/*
=================================================================================================
manage weather measurements
=================================================================================================
*/

/**
 * 
 * @param {String} stationId
 * @param {Date} startDate 
 * @param {Date} endDate 
 * @returns Devuelve un objeto con una lista de mediciones relevadas por la estacion especificada
 *          y en el intervalo de fechas [endDate; startDate].
 * 
 */
const getWeatherdataBetweenDates = async (stationId, startDate, endDate) => {
    try {
        const query = 'SELECT * FROM getWeatherdataBetweenDates($1, $2, $3);'
        const values = [stationId, startDate, endDate]
        const response = await finaluserPool.query(query, values)
    
        return { measurements: response.rows }
    } catch(err){
        throw err
    }
}


/**
 * 
 * @param {String} idStation
 * @returns Devuelve un objeto con la ultima medicion realizada por la estacion especificada.
 * 
 */
const getWeatherdataByStationId = async (idStation) => {
    try {
        const query = 'SELECT * FROM getWeatherdataByStationId($1);'
        const values = [idStation]
        const response = await finaluserPool.query(query, values)
    
        return { measurement: response.rows[0] }
    } catch(err) {
        throw err
    }
}

/**
 * 
 * @param {String} region 
 * @param {String} city 
 * @returns Devuelve un objeto con la ultima medicion realizada en la region especificada.
 * 
 */
const getWeatherdataByPlace = async (region, city) => {
    try {
        const query = 'SELECT * FROM getWeatherdataByPlace($1, $2);'
        const values = [region, city]
        const response = await finaluserPool.query(query, values)
        
        return { measurement: response.rows[0] }
    } catch(err) {
        throw err
    }
}

/**
 * 
 * @param {Double Presision} latitude 
 * @param {Double Presision} longitude 
 * @returns Devuelve un objeto con la ultima medicion realizada en la geolocalizacion especificada.
 * 
 */
const getWeatherdataByGeolocation = async (latitude, longitude) => {
    try {
        const query = 'SELECT * FROM getWeatherdataByGeolocation($1, $2);'
        const values = [latitude, longitude]
        const response = await finaluserPool.query(query, values)
        
        return { measurement: response.rows[0] }
    } catch(err) {
        throw err
    }
}


/**
 * 
 * @param {String} zipcode 
 * @returns Devuelve un objeto con la ultima medicion realizada en la region con
 *          el codigo de area especificado.
 * 
 */
const getWeatherdataByZipcode = async (zipcode) => {
    try {
        const query = 'SELECT * FROM getWeatherdataByZipcode($1);'
        const values = [zipcode]
        const response = await finaluserPool.query(query, values)
        
        return { measurement: response.rows[0] }
    } catch(err) {
        throw err
    }
}

module.exports = {
    getStations,
    getStationdataBetweenDates,
    getStationdataById,
    getStationdataByPlace,
    getStationdataByGeolocation,
    getStationdataByZipcode,
    getWeatherdataBetweenDates,
    getWeatherdataByStationId,
    getWeatherdataByPlace,
    getWeatherdataByGeolocation,
    getWeatherdataByZipcode
}