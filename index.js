require('dotenv').config();

const Stonks = require('./core/client.js');
const client = new Stonks();


const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

client.login(process.env.TOKEN);
