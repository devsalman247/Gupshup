module.exports = {
    secret : process.env.NODE_ENV==='production' ? process.env.secret : 'secret'
}