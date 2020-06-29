const { adminPool } = require('./pool')
const { capitalize } = require('../util/capitalize')

/*
=================================================================================================
manage locations
=================================================================================================
*/

/**
 * @returns Devuelve un objeto con una lista de todas las localizaciones existentes.
 */
const getLocations = async () => {
    try {
        const query = `SELECT * FROM location;`
        const values = []
        const response = await adminPool.query(query, values)

        return { locations: response.rows }
    } catch (err) {
        throw err
    }
}

/**
 * @returns Devuelve un objeto con una lista de las localizaciones con mas de una estacion.
 */
const locationsMoreThanOneStation = async () => {
    try {
        const query = `SELECT * FROM locationsMoreThanOneStation;`
        const values = []
        const response = await adminPool.query(query, values)

        return { locations: response.rows }
    } catch (err) {
        throw err
    }
}

/*
=================================================================================================
manage stations
=================================================================================================
*/

/**
 * @returns Devuelve un objeto con una lista de estacion que fallaron al menos una vez.
 */
const stationsThatFailed = async () =>{
    try {
        const query = `SELECT * FROM stationsThatFailed;`
        const values = []
        const response = await adminPool.query(query, values)

        return { stations: response.rows }
    } catch (err) {
        throw err
    }
}

/*
=================================================================================================
manage clients
=================================================================================================
*/

/**
 * 
 * @param {String} planDescription 
 * @returns Devuelve un objeto con una lista de clientes suscriptos al plan especificado.
 * 
 */
const clientsSuscribedAtPlan = async (planDescription) => {
    try {
        const query = `SELECT * FROM clientsSuscribedAtPlan($1) AS 
            clients(id_client varchar, username varchar, email varchar);`
        const values = [capitalize(planDescription)]
        const response = await adminPool.query(query, values)

        return { clients: response.rows }
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @returns Devuelve un objeto con una lista de todos los clientes que realizaron consultas la ultima semana.
 * 
 */
const customersConsultLastWeek = async () => {
    try {
        const query = `SELECT * FROM customersConsultLastWeek;`
        const values = []
        const response = await adminPool.query(query, values)

        return { clients: response.rows }
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @returns Devuelve un objeto con una lista de todos los clientes.
 * 
 */
const getCustomers = async () => {
    try {
        const query = `SELECT finaluser.username, finaluser.profile_picture, finaluser.email, client.suscribed_to_plan, client.available_consults FROM finaluser, client WHERE client.id_finaluser=finaluser.id_finaluser;`
        const values = []
        const response = await adminPool.query(query, values)

        return { clients: response.rows }
    } catch (err) {
        throw err
    }
}

module.exports = {
    getLocations,
    stationsThatFailed,
    locationsMoreThanOneStation,
    clientsSuscribedAtPlan,
    customersConsultLastWeek,
    getCustomers,
}