const express = require('express');
const connectDb = require('./config/db');
const app = express();

//Connect To MogoDb Atlas Database
connectDb();

//Initialiaze middlewares
app.use(express.json({ extended: false }));

// Routes
app.use('/api/users', require('./routes/users'));

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`STOCK API is running on port ${PORT}`);
});
