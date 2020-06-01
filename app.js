const express = require('express');
const passport = require('passport');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const catagoriesRoutes = require('./routes/catagoriesRoutes');
const priceRoutes = require('./routes/priceRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
require('./auth/passport')(passport);
// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/catagories', catagoriesRoutes);
app.use('/api/v1/price', priceRoutes);

// unhandled routes
app.all('*', (req, res) => {
  res.status(404).json({ status: 'fail', message: `Can't find ${req.originalUrl} on this server!` });
});

module.exports = app;
