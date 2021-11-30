const mongoUser = process.env.MONGODB_USERNAME
const mongoPass = process.env.MONGODB_PASSWORD
const mongoSrv = process.env.MONGODB_SERVER
const mongoDb = process.env.MONGODB_DATABASE

const mongoUri = `mongodb://${mongoUser}:${encodeURIComponent(mongoPass)}@${mongoSrv}:27017/${mongoDb}`;
const port = Number(process.env.PORT);

console.log('** CONFIG **');
console.log(' * Mongo', mongoUri);
console.log(' * Port', port);

module.exports = {
    mongoUri,
    port,
}