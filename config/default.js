module.exports = {
    port: 9090,
    url: 'mongodb://localhost:27017/Account',
    session: {
        name: '.sid',
        secret: '.secret',
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 365 * 24 * 60 * 60 * 1000,
        }
    }
}