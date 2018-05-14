const env = process.env.NODE_ENV || 'dev'; //environment variable
const port = process.env.PORT || 4000; //determining the port
const dbURI = process.env.MONGODB_URI || `mongodb://localhost/smart-travel-${env}`; //db
const secret = process.env.SECRET || 'a^yd%2GH!)zI*_4fsQ'; //secret needed for user authentication

module.exports = { env, port, dbURI, secret };
