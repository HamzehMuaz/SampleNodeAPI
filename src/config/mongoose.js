const mongoose = require('mongoose');
const { mongoConnection } = require('./vars');

mongoose.Promise = Promise;

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

mongoose.set('debug', true);

exports.connect = () => {
  mongoose.connect(mongoConnection, {
    keepAlive: 1,
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
  }).catch((error) => {
    console.error(error);
  });

  return mongoose.connection;
};
