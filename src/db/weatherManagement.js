const { adminPool } = require('./pool')

const registerMeasurement = async (stationId, temperature, humidity, pressure, uvRadiation, windVel, windDir, rainMM, rainIntensity) => {
    try {
        const query = `INSERT INTO measurement(id_station, temperature, humidity, pressure, uv_radiation, wind_vel, wind_dir, rain_mm, rain_intensity) values($1, $2, $3, $4, $5, $6, $7, $8, $9);`
        const values = [stationId, temperature, humidity, pressure, uvRadiation, windVel, windDir, rainMM, rainIntensity]
        const response = await adminPool.query(query, values)

        return
    } catch (err) {
        throw err
    }
}

module.exports = { registerMeasurement }