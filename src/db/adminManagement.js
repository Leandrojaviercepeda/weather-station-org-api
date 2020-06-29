const { adminPool } = require('./pool')

/**
 * 
 * @param {String} emailAdress
 * @returns Devuelve un objeto con el identificador del cliente con el email especificado.
 * 
 */
const searchAdmin = async (emailAdress) => {
    try {
        const query = `SELECT administrator.id_administrator FROM administrator, finaluser 
            WHERE administrator.id_finaluser=finaluser.id_finaluser AND finaluser.email=$1;`
        const values = [emailAdress.toLocaleLowerCase()]
        const response = await adminPool.query(query, values)
        const adminNotFound = !response.rows[0]
        
        if (adminNotFound) {
            const err = new Error('Administrator not found.')
            err.status = 404
            throw err
        }

        return { adminId: response.rows[0].id_administrator }
    } catch (err) {
        throw err
    }
}

module.exports = {
    searchAdmin
}