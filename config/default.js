module.exports = {
    port: parseInt(process.env.PORT, 10) || 9003,
    url: 'mongodb://localhost:27017/SmartForm',
    session: {
        name: 'SID',
        secret: 'secret',
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 365 * 24 * 60 * 60 * 1000,
        }
    }
}