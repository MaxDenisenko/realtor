const Routes = require('express').Router
const {registration,activate} = require('../controllers/registration.controllers')
const expressValidator = require('express-validator')

const router = new Routes()


router.post('/registration', 
            expressValidator.body('name').isLength({min:3, max: 14}),
            expressValidator.body('lastname').isLength({min:3, max: 14}),
            expressValidator.body('email').isEmail(),
            expressValidator.body('password').isLength({min:3, max:14}),
            registration)
router.get('/activate/:link', activate)

module.exports = router