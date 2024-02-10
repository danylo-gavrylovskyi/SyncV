const mongoose = require('mongoose');

let dbString = 'mongodb+srv://danyagavrylovskyi:ARuACyoS7Myf8vDO@cluster0.tbxnc8a.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dbString);

const dbConnection = mongoose.connection;

dbConnection.on('error', () => console.error('MongoDB connection error:'));

dbConnection.once('open', () => console.log('Connected to MongoDB'));

module.exports = mongoose;
