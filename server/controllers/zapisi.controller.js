const zapisiService = require('../services/zapisi.service')

class ZapisiControllers {
    async getZapisi (req, res, next) {
        try {
            const zapisi = await zapisiService.getZapis()
            return res.json(zapisi)    
        } catch (error) {
            next(error)
        }
        
    }
    async createUpdateZapis (req, res, next) {
        try {
            const { phone } = req.body
            const zapisData = await zapisiService.createZapis(phone)
            return res.json(zapisData)    
        } catch (error) {
            next(error)
        }
        
    }
}

module.exports = new ZapisiControllers()