const ApiError = require('../exceptions/apiError')
const commentsModule = require('../models/comments.module')

class CommentsService {
    async getComments() {
        const commentsData = await commentsModule.findAll()
        return commentsData
    }
    async createComment(date, phone, realtorFIO, plusminus, message ) {
        const findComment = await commentsModule.findOne({where: {phone} && {realtorFIO} && {plusminus}})
        if (findComment) {
            throw ApiError.BadRequest(`Комментарий на номер (${phone}) Вами уже оставлен`)
        }
        const createComment = await commentsModule.create({date, phone, realtorFIO, plusminus, message})
        return createComment
    }
}

module.exports = new CommentsService()