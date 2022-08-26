const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

const PORT = 3000;

app.use(bodyParser.json())

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loginuser'
})

db.connect((e)=>{
    if(e){
        throw e;
    }
    console.log('Conexão realizada')
})

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
} )
