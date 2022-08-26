const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3000,
    database: 'loginuser'
})

db.connect((e)=>{
    if(e){
        throw e;
    }
    console.log('Conexão realizada')
})

module.exports = db;