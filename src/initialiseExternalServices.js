import mongoose from 'mongoose';

const mongoRepository = 'phingsApi';
const host = process.env.PHINGSAPI_DB_HOST || 'localhost';
const dbConnectionUrl = `mongodb://${host}:27017/${mongoRepository}`;

mongoose.Promise = global.Promise;
if (mongoose.connection.readyState !== 1) {
  mongoose.connect(dbConnectionUrl);
}

