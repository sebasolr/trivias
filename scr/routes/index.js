const express = require('express');
const router = express.Router();

//routes  initial 
router.get('/', (req, res) => {
res.send('Hello Words   !')
})

module.exports = router;