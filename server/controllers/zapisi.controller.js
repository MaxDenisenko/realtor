const zapisiService = require('../services/zapisi.service')

class ZapisiControllers {
    async getZapisi (req, res) {
        const zapisi = await zapisiService.getZapis()
        return res.json(zapisi)
    }
    async createUpdateZapis (req, res) {
        const { phone } = req.body
        const zapisData = await zapisiService.createZapis(phone)
        return res.json(zapisData)
    }
}

module.exports = new ZapisiControllers()