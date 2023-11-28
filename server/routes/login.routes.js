const Routes = require('express').Router
const {login, refresh} = require('../controllers/login.controllers')

const router = new Routes()

router.post('/login',login)
router.get('/refresh', refresh)


module.exports = router