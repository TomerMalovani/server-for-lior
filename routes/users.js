var express = require('express');
var router = express.Router();

const db = require('../config/db');
const { registerUser, getUserContact } = require('../controllers/usersController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// register a new user
router.post('/register', registerUser);

router.get('/contact', getUserContact);



module.exports = router;
