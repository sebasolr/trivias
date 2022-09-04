const express = require('express');
const router = express.Router();
//conecion a base de datos.
const pool = require('../database');

//inicio de sesion en login
router.get('/login', (req, res) => {
    res.render('links/login')
})

router.post('/login', (req, res) => {
    const {username, password} = req.body;
    const newLogin = {
        username, 
        password};
        console.log(newLogin);
        req.flash('success', 'Welcome! You have successfully signed up');
    res.redirect('/links/login')
});

//registro de usuario en la base de datos
router.get('/register',(req, res) => {
    res.render('links/add')
});

router.post('/register', async (req, res) => {
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
    res.redirect('/links/login')
})

//registros de preguntas en la base de datos
router.get('/question',(req, res) => {
    res.render('links/question')});
 
router.post('/question', async (req, res) => {
    const {question, answer_correct, answer_incorrect_one,answer_incorrect_two, answer_incorrect_three} = req.body
    const newQuestion ={
        question,
        answer_correct,
        answer_incorrect_one,
        answer_incorrect_two,
        answer_incorrect_three
        };
        console.log(newQuestion);
        await pool.query('INSERT INTO preguntas set ?', [newQuestion]);
    res.send("Create Question")

});

//responder preguntas
router.get('/test', async (req, res) => {
    const questions = await pool.query('SELECT * FROM preguntas');
    res.render('links/test',{questions:questions})
});

module.exports = router;