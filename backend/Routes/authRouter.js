const { signup, login } = require('../controllers/authcontroller'); 
const { singupValidation } = require('../middiewares/authvalidation');
const { loginValidation } = require('../middiewares/authvalidation');
const router = require('express').Router();

router.post('/signup', singupValidation, signup);
router.post('/login', loginValidation, login);

module.exports = router;
