const express = require('express');
const app = express();
const connectDb = require('./config/db');

//Connect To MogoDb Atlas Database
connectDb();

app.get('/', (req, res) => {
  res.send('Hello from STOCK API');
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`STOCK API is running on port ${PORT}`);
});
