module.exports = {
    port: process.env.PORT || 3002,
    db: process.env.MONGOFB || 'mongodb://localhost:27017/PlataformaCursos',
    salt: process.env.SALT || 10,
    secret: process.env.JWT_SECRET || 'TokenMegaUltraSecretoQueNadieDebeSaberNuncaJamas'
}