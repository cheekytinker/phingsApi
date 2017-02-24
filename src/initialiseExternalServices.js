import mongoose from 'mongoose';

const mongoRepository = 'phingsApi';
const dbConnectionUrl = `mongodb://localhost:27017/${mongoRepository}`;

mongoose.Promise = global.Promise;
if (mongoose.connection.readyState !== 1) {
  mongoose.connect(dbConnectionUrl);
}

