
/**
 * 
 * @param {String} w 
 * @function capitaliza el string recibido como parametro, convirtiendo a mayuscula la primer letra en cada palabra
 * @returns devuelve el string recibido como argumento capitalizado.
 * 
 */
const capitalize = (w) => {
    let words = w.split(' ')
    words.forEach((word, idx) => {
        words[idx] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    
    return words.join(' ')
}


module.exports = {
    capitalize
}