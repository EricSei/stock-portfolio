const express = require('express');
const connectDb = require('./config/db');
const app = express();
const cors = require('cors');

app.use(cors());

//Connect To MogoDb Atlas Database
connectDb();

//Initialiaze middlewares
app.use(express.json({ extended: false }));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`STOCK API is running on port ${PORT}`);
});
