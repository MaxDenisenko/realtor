const zapisiService = require('../services/zapisi.service')

class ZapisiControllers {
    async getZapisi (req, res) {
        const zapisi = await zapisiService.getZapis()
        return res.json(zapisi)
    }
    async createUpdateZapis (req, res) {
        const { id, date, area, sum, fioClient, phoneClient, comment } = req.body
        if (id) {
            const zapisData = await zapisiService.updateZapis(id, date, area, sum, fioClient, phoneClient, comment)
            return res.json(zapisData)
        }
        const zapisData = await zapisiService.createZapis(date, area, sum, fioClient, phoneClient, comment)
        return res.json(zapisData)
    }
    async deleteZapis (req, res) {
        const id = req.params.id
        await zapisiService.deleteZapis(id)
        return res.status(200).json('Запись удалена')
    }
}

module.exports = new ZapisiControllers()