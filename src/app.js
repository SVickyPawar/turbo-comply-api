const express = require('express');
const morgan = require('morgan');
const tradesRoutes = require('./routes/trades');

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(morgan(':method :url :status :response-time ms - :date[clf]'));

// Routes
app.use('/trades', tradesRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
