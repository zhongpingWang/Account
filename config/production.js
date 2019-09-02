module.exports = {
    port: parseInt(process.env.PORT, 10) || 9095,
    url: 'mongodb://localhost:27017/iCar',
    session: {
        name: 'SID',
        secret: 'SID',
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 365 * 24 * 60 * 60 * 1000,
        }
    }
}