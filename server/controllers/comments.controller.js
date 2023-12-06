const commentsService = require('../services/comments.service')

class CommentsControllers {
    async getComments (req, res, next) {
        try {
            const response = await commentsService.getComments
            return res.json(response)    
        } catch (error) {
            next(error)
        }
        
    }
    async createComment (req, res, next) {
        try {
            const { date, phone, realtorFIO, plusminus, message } = req.body
            const response = await commentsService.createComment(date, phone, realtorFIO, plusminus, message)
            return res.json(response)    
        } catch (error) {
            next(error)
        }
        
    }
}

module.exports = new CommentsControllers()