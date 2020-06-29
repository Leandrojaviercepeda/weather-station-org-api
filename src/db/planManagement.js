const { adminPool } = require('./pool')
const { capitalize } = require('../util/capitalize')

/*
=================================================================================================
plan management
=================================================================================================
*/

/**
 * 
 * @param {String} description 
 * @param {Double Presision} price 
 * @param {Double Presision} amountConsults
 * @function Registra un plan con la informacion especificada. 
 * 
 */
const createPlan = async (planDescription, price, amountConsults, historical_data) => {
    try {       
        const query = `INSERT INTO plan(description, price, amount_consults, historical_data)
            VALUES($1, $2, $3, $4);`
        const values = [capitalize(planDescription), price, amountConsults, historical_data]
        const response = await adminPool.query(query, values)

        return
    } catch (err) {
        if (err.code == '23505') 
            err.message = `Ooops! el plan ${description} ya existe.`
        throw err
    }
}

/**
 * 
 * @param {String} description 
 * @function Elimina el plan especificado.
 * 
 */
const deletePlan = async (planDescription) => {
    try {
        const query = `DELETE FROM plan WHERE plan.description=$1;`
        const values = [capitalize(planDescription)]
        const response = await adminPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} description 
 * @param {Double Presision} price 
 * @function Edita el precio del plan especificado.
 * 
 */
const setPrice = async (planDescription, price) => {
    try {
        const query = `UPDATE plan SET price=$2 WHERE plan.description=$1;`
        const values = [capitalize(planDescription), price]
        const response = await adminPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} planDescription 
 * @param {Integer} amountConsults 
 * @function Edita la cantidad de consultas que pueden realizarse estando suscripto 
 *           al plan especificado.
 * 
 */
const setAmountConsults = async (planDescription, amountConsults) => {
    try {
        const query = `UPDATE plan SET amount_consults=$2 WHERE plan.description=$1;`
        const values = [capitalize(planDescription), amountConsults]
        const response = await adminPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} planDescription 
 * @param {String} historicalData 
 * @function Edita la cantidad de datos historicos que pueden obtenerse estando suscripto 
 *           al plan especificado.
 * 
 */
const setHistoricalData = async (planDescription, historicalData) => {
    try {
        const query = `UPDATE plan SET historical_data=$2 WHERE plan.description=$1;`
        const values = [capitalize(planDescription), historicalData]
        const response = await adminPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} description 
 * @returns Devuelve un objeto con la informacion del plan especificado.
 * 
 */
const getPlan = async (planDescription) => {
    try {
        const query = `SELECT * FROM plan WHERE plan.description=$1;`
        const values = [capitalize(planDescription)]
        const response = await adminPool.query(query, values)

        return { plan: response.rows[0] }
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} description 
 * @returns Devuelve un objeto con la informacion del plan especificado.
 * 
 */
const getPlans = async () => {
    try {
        const query = `SELECT * FROM plan;`
        const values = []
        const response = await adminPool.query(query, values)

        return { plans: response.rows }
    } catch (err) {
        throw err
    }
}


module.exports = {
    createPlan,
    deletePlan,
    setPrice,
    setAmountConsults,
    setHistoricalData,
    getPlan,
    getPlans,
}