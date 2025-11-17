const mongoose = require('mongoose');

const connectDB = async (uri) => {
  const connectionUri = uri || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mern_testing';
  mongoose.set('strictQuery', true);
  await mongoose.connect(connectionUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  return mongoose.connection;
};

module.exports = connectDB;

