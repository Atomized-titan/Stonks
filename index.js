require('dotenv').config();

const Stonks = require('./core/client.js');
const client = new Stonks();


const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

client.login(process.env.TOKEN);
