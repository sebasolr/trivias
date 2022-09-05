const express = require('express');
const router = express.Router();

const { isLoggedIn, isNotloggedIn } = require('../lib/auth')
//conecion a base de datos.
const pool = require('../database');

//registros de preguntas en la base de datos
router.get('/question',isLoggedIn,(req, res) => {
    res.render('links/question')});
 
router.post('/question',isLoggedIn, async (req, res) => {
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
router.get('/test',isLoggedIn, async (req, res) => {
    const questions = await pool.query('SELECT * FROM preguntas');
    res.render('links/test',{questions:questions})
});

module.exports = router;