const routes = require('express').Router();

routes.get('/users', (req, res)=>{
    db.query('SELECT * FROM userdata', (e, rows, fields)=>{
        if(!e)
        res.send(rows);
        else
        console.log(e);
    })
})

routes.post('/add', (req, res)=>{
    const data = {
        name: req.body.name, email: req.body.email, password: req.body.password, 
        tel: req.body.tel, cpf: req.body.cpf, acess: req.body.acess, active: req.body.active
            }
    db.query('INSERT INTO userdata SET?',data, (e, rows, fields)=>{
        if(!e)
        res.send(rows);
        else
        console.log(e);
    }) 
})