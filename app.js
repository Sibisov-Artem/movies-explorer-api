require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(DB_URL, {
}).then(() => {
  console.log('connected to DB');
});

app.listen(PORT, () => {
  console.log(`Приложение слушает следующий порт: ${PORT}`);
});
