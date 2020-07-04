require('dotenv').config();

module.exports = {
  host: process.env.HOST,
  port: process.env.PORT,
  mongoConnection: process.env.MONGO_CONNECTION,
};
