const { clientPool, adminPool } = require('./pool')
const { getPlan } = require('./planManagement')
const { capitalize } = require('../util/capitalize')
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'weatherstorg@gmail.com',
        pass: 'WeatherSt.2020'
    }
})

/**
 * 
 * @param {String} emailAdress
 * @returns Devuelve un objeto con el identificador del cliente con el email especificado.
 * 
 */
const searchClient = async (emailAdress) => {
    try {
        const query = `SELECT client.id_client FROM client, finaluser 
            WHERE client.id_finaluser=finaluser.id_finaluser AND finaluser.email=$1;`
        const values = [emailAdress.toLocaleLowerCase()]
        const response = await clientPool.query(query, values)
        const clientNotFound = !response.rows[0]
        
        if (clientNotFound) {
            const err = new Error('Client not found.')
            err.status = 404
            throw err
        }

        return { client: response.rows[0] }
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} email 
 * @param {String} password 
 * @param {String} username 
 * @param {String} birthdate 
 * @param {String} profilePicture 
 * @function Registra un cliente con la informacion especificada.
 */
const signUp = async (email, username, profilePicture=null) => {
    try {
        const query = `INSERT INTO finaluser(email, username, profile_picture)
            VALUES($1, $2, $3);`
        const values = [email.toLocaleLowerCase(), capitalize(username), profilePicture]
        const response = await clientPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} clientId 
 * @function Elimina la cuenta del cliente especificado.
 * 
 */
const deleteAccount = async (clientId) => {
    try {
        const query = `DELETE FROM client WHERE client.id_client=$1;`
        const values = [clientId]
        const response = await clientPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} clientId 
 * @function Devuelve un objeto con la informacion del cliente especificado.
 * 
 */
const getClient = async (clientId) => {
    try {
        const query = `SELECT * FROM client WHERE client.id_client=$1;`
        const values = [clientId]
        const response = await clientPool.query(query, values)
        const clientData = response.rows[0]
        const apikeys = await getApikeys(clientId)
                
        if (!clientData) {
            const err = new Error('Client not found.')
            err.status = 404
            throw err
        }

        return { client: Object.assign({}, clientData, apikeys) }
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} clientId 
 * @param {String} planToSuscribe 
 * @function Actualiza el plan actual del cliente al plan seleccionado
 *      si este no es el plan actual y si es un plan valido.
 * 
 */
const upgradePlan = async (clientId, planToSuscribe) => {
    try {
        const query = `SELECT upgradePlan($1, $2);`
        const values = [clientId, capitalize(planToSuscribe)]
        const response = await clientPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} clientId 
 * @returns Devuelve la informacion del plan al que esta suscripto el cliente especificado.
 * 
 */
const suscribedToPlan = async (clientId) => {
    try {
        const query = `SELECT client.suscribed_to_plan FROM client WHERE client.id_client=$1;`
        const values = [clientId]
        const response = await clientPool.query(query, values)
        const { plan } = await getPlan(response.rows[0].suscribed_to_plan)
       
        return { plan: plan }
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} clientId
 * @returns Devuelve las consultas disponibles a la API del cliente especificado.
 * 
 */
const getAilableConsults = async (clientId) => {
    try {
        const query = `SELECT client.available_consults FROM client WHERE client.id_client=$1;`
        const values = [clientId]
        const response = await clientPool.query(query, values)
       
        return { client: response.rows[0] }
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} emailAdress 
 * @param {String} apikeyName 
 * @function Genera una apikey nueva para el cliente especificado.
 * 
 */
const generateApikey = async (clientId, apikeyName) => {
    try {
        const query = `SELECT generateApikey($1, $2);`
        const values = [clientId, apikeyName]
        const response = await clientPool.query(query, values)
        
        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} emailAdress 
 * @param {String} idApikey 
 * @function Elimina el apikey, del cliente especificado.
 * 
 */
const deleteApikey = async (clientId, idApikey) => {
    try {
        const query = `DELETE FROM apikey WHERE apikey.id_client=$1 AND apikey.id_apikey=$2;`
        const values = [clientId, idApikey]
        const response = await clientPool.query(query, values)
        
        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} emailAdress 
 * @param {String} apikeyName 
 * @function Edita el nombre del apikey, del cliente especificado.
 * 
 */
const renameApikey = async (clientId, apikeyId, apikeyName) => {
    try {
        const query = `UPDATE apikey SET name_apikey=$3
            WHERE apikey.id_client=$1 AND apikey.id_apikey=$2;`
        const values = [clientId, apikeyId, apikeyName]
        const response = await clientPool.query(query, values)
       
        return
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} emailAdress 
 * @returns Devuelve un objeto con la lista de apikeys del cliente especificado.
 * 
 */
const getApikeys = async (clientId) => {
    try {
        const query = `SELECT * FROM apikey WHERE apikey.id_client=$1;`
        const values = [clientId]
        const response = await clientPool.query(query, values)
       
        return { apikeys: response.rows }
    } catch (err) {
        throw err
    }
}

/**
 * 
 * @param {String} clientId 
 * 
 */
const notifyClient = async (clientId) => {
    try {
        const query = `SELECT finaluser.email, finaluser.username FROM finaluser, client 
                        WHERE client.id_client=$1 and client.id_finaluser=finaluser.id_finaluser`
        const values = [clientId]
        const response = await adminPool.query(query, values)
        const finaluser = response.rows[0]
        const { plan } = await suscribedToPlan(clientId)        
        
        const mailOptions = {
            from: 'weatherstorg@gmail.com',
            subject: `Suscripcion al plan ${plan.description}`, 
            text: `Hola ${finaluser.username}! te has suscripto al plan ${plan.description} el cual te provee ${plan.amount_consults} consultas diarias a nuestra API, acceso a todas las variables e historial ${plan.historical_data}, a un precio de USD$${plan.price}/mes. Para mas informacion acerca de su uso consulte la seccion de API Doc en nuestra web.`,
            to: finaluser.email
        }        
    
        transporter.sendMail(mailOptions)
    } catch (err) {
        throw err
    }
}



module.exports = {
    searchClient,
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
    notifyClient,
}
