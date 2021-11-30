const mongoUser = process.env.MONGODB_USERNAME
const mongoPass = process.env.MONGODB_PASSWORD
const mongoSrv = process.env.MONGODB_SERVER
const mongoDb = process.env.MONGODB_DATABASE

const mongoUri = `mongodb://${mongoUser}:${encodeURIComponent(mongoPass)}@${mongoSrv}:27017/${mongoDb}`
const port = process.env.PORT;

module.exports = {
    mongoUri,
    port,
}