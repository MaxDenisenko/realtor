const ApiError = require('../exceptions/apiError')
const commentsModule = require('../models/comments.module')
const zapisModule = require('../models/zapisi.module')

class CommentsService {
    async getComments(phone) {
        const commentsData = await commentsModule.findAll({where: {phone}})
        return commentsData
    }
    async createComment(date, phone, realtorFIO, plusminus, message ) {
        const findComment = await commentsModule.findOne({where: {phone, realtorFIO}})
        if (findComment) {
            throw ApiError.BadRequest(`Комментарий на номер (${phone}) Вами уже оставлен`)
        }
        const createComment = await commentsModule.create({date, phone, realtorFIO, plusminus, message})
        if (plusminus === 'Отрицательный') {
            await zapisModule.update({minus: sequelize.literal('minus + 1')},{where: phone})
        }
        await zapisModule.update({plus: sequelize.literal('plus + 1')},{where: phone})
            
        return createComment
    }
}

module.exports = new CommentsService()