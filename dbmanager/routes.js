const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/registerController');
const {login} = require('./controllers/loginController');
const {getUser} = require('./controllers/getUserController');

router.post('/register', [
    body('user_name',"The user_name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('user_Email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('user_password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
], register);


router.post('/login',[
    body('user_Email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('user_password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
],login);

router.get('/getuser',getUser);

module.exports = router;