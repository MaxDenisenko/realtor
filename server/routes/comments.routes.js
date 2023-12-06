const Router = require('express')

const router = new Router()
const { getComments, createComment} = require('../controllers/comments.controller')
const authMidleware = require('../middleware/auth.midleware')

router.get('/comment',authMidleware, getComments)
router.post('/comment',authMidleware, createComment)



module.exports = router