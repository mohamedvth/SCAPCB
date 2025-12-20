const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const readingsRoutes = require('./routes/readings');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/readings', readingsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SCAPCB API listening on http://localhost:${PORT}`);
});