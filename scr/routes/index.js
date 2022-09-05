const express = require('express');
const router = express.Router();

//routes  initial 
router.get('/', (req, res) => {
res.render('index');
})

module.exports = router;