const Routes = require('express').Router
const {logout} = require('../controllers/logout.controllers')

const router = new Routes()

router.post('/logout',logout)

module.exports = router