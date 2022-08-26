require('../config/connection')
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const port = (process.env.port || 3000)
app.set('port', port);

app.use(bodyParser.json());

app.use(cors({
    credentials: true,
    origin: true
}));

app.options('*', cors());

app.use(express.json());
app.use(routes);

app.listen(port, () =>{
    console.log(`Listening on port ${port}`);
} )
