require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// API Prefix
app.use('/api/sheets', routes);

app.get('/', (req, res) => {
  res.send('Google Sheets DB API is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
