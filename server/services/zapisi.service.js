const ApiError = require('../exceptions/apiError')
const zapisModels = require('../models/zapisi.module')

class ZapisiService {
    async getZapis() {
        const zapisiData = await zapisModels.findAll()
        return zapisiData
    }
    async createZapis(phone) {
        const findZapis = await zapisModels.findOne({where: {phone}})
        if (findZapis) {
            throw ApiError.BadRequest(`Данный номер (${phone}) уже внесен в базу`)
        }
        const createZapis = await zapisModels.create({phone})
        return createZapis
    }
}

module.exports = new ZapisiService()