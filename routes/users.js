var express = require('express');
var router = express.Router();

const db = require('../config/db');
const { registerUser, getUserContacts, updateConnection, getConnection,updateDetails, fallDetection } = require('../controllers/usersController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// register a new user
router.post('/register', registerUser);
router.put('/register/update', updateDetails);
router.put('/connection_bracelet', updateConnection);
router.get('/connection_app', getConnection);
router.get('/contacts', getUserContacts);
router.put('/alert', fallDetection);



module.exports = router;
