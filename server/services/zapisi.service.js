const ApiError = require('../exceptions/apiError')
const zapisModels = require('../models/zapisi.module')

class ZapisiService {
    async getZapis() {
        const zapisiData = await zapisModels.findAll()
        return zapisiData
    }
    async createZapis(date, area, sum, fioClient, phoneClient, comment) {
        const createZapis = zapisModels.create({date, area, sum, fioClient, phoneClient, comment})
        return createZapis
    }
    async updateZapis(id, date, area, sum, fioClient, phoneClient, comment) {
        const findZapis = await zapisModels.findOne({where: {id}})
        if (!findZapis) {
            throw ApiError.BadRequest('Не корректный id')
        }
        await zapisModels.update({date, area, sum, fioClient, phoneClient, comment}, {where: {id}})
        return "Запись обновлена"
    }
    async deleteZapis(id) {
        const findZapis = await zapisModels.findOne({where: {id}})
        if (!findZapis) {
            throw ApiError.BadRequest('Не корректный id')
        }
        const deleteZapis = await zapisModels.destroy({where: {id}})
        return deleteZapis
    }
}

module.exports = new ZapisiService()