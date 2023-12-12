const ApiError = require('../exceptions/apiError')
const commentsModule = require('../models/comments.module')
const zapisModule = require('../models/zapisi.module')

class CommentsService {
    async getComments(phone) {
        const commentsData = await commentsModule.findAll({where: {phone}})
        if (commentsData.length===0) {
            throw ApiError.MessageResponse('Нет комментариев')
        }
        return commentsData
    }
    async createComment(date, phone, realtorFIO, plusminus, message ) {
        const findComment = await commentsModule.findOne({where: {phone, realtorFIO}})
        if (findComment) {
            throw ApiError.MessageResponse(`Комментарий на номер (${phone}) Вами уже оставлен`)
        }
        const createComment = await commentsModule.create({date, phone, realtorFIO, plusminus, message})

        const findPhone = await zapisModule.findOne({where: {phone}})
        if (plusminus === 'Отрицательный') {
            await findPhone.increment('minus')
        }
        if ((plusminus === 'Положительный'))
        await findPhone.increment('plus')
            
        return createComment
    }
}

module.exports = new CommentsService()