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
app.use('/api/transactions', require('./routes/transactions'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`STOCK API is running on port ${PORT}`);
});
