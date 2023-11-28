const Router = require('express')

const router = new Router()
const { getZapisi, createUpdateZapis} = require('../controllers/zapisi.controller')
const authMidleware = require('../middleware/auth.midleware')

router.get('/zapis',authMidleware, getZapisi)
router.post('/zapis',authMidleware, createUpdateZapis)



module.exports = router