const express = require('express');
const router = express.Router();
//conecion a base de datos.
const pool = require('../database');

router.get('/add',(req, res) => {
    res.render('links/add')
});

router.post('/add', async (req, res) => {
    const {firstname,lastname,email,username,password} = req.body;
    const newUser ={
        firstname,
        lastname,
        email,
        username,
        password
    };
   await pool.query('INSERT INTO usuarios set ?', [newUser]);
    
    console.log(newUser);
    res.send('recived')
})
module.exports = router;