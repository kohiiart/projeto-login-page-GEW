const routes = require('express').Router();
const connection = require('./config/connection')

routes.get('/', (req, res) => {
    connection.query('SELECT * FROM userdata', (e, rows, fields)=>{
        if(!e)
        res.send(rows);
        else
        console.log(e);
    })
})
routes.get('/:id', (req, res) => {
    const {id} = req.params
    connection.query('SELECT * FROM userdata WHERE id = ?', [id], (e, rows, fields)=>{
        if(!e)
        res.send(rows[0]);
        else
        console.log(e);
    })
})

routes.post('/new', (req, res)=>{
    const data = {
        name: req.body.name, email: req.body.email, password: req.body.password, 
        tel: req.body.tel, cpf: req.body.cpf, acess: req.body.acess, active: req.body.active
            }
     connection.query('INSERT INTO userdata SET?',data, (e, rows, fields)=>{
        if(!e)
        res.send(rows);
        else
        console.log(e);
    }) 
})

 routes.put('/:id', (req, res)=>{
    const {id} = req.params
    const {name, email, password, tel, cpf, acess, active} = req.body

    connection.query(`UPDATE userdata SET name ='${name}', email ='${email}',
    password = '${password}', tel = '${tel}', cpf = '${cpf}', acess = '${acess}', 
    active = '${active}' WHERE id = '${id}'`, (e, rows, fields)=>{
        if(!e)
        res.send(rows);
        else
        console.log(e);
    })  
}) 

routes.delete('/:id', (req, res)=>{
    const {id} = req.params
    const {name, email, password, tel, cpf, acess, active} = req.body

    connection.query(`DELETE FROM userdata WHERE id = '${id}'`, (e, rows, fields)=>{
        if(!e)
        res.send(rows);
        else
        console.log(e);
    })  
})

module.exports = routes;