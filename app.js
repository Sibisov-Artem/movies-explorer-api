require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const bodyParser = require('body-parser');


const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const app = express();

mongoose.connect(DB_URL, {
}).then(() => {
  console.log('connected to DB');
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '64c53601db36345167ac0fd5',
  };
  next();
});
app.use(router);

app.listen(PORT, () => {
  console.log(`Приложение слушает следующий порт: ${PORT}`);
});
