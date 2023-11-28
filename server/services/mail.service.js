const nodemailer = require('nodemailer')
class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host:process.env.SMTP_HOST,
            port:process.env.SMTP_PORT,
            secure:true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            }
        })
    }
    async sendMail(to, activatedLink) {
            try {
                await this.transporter.sendMail({
                    from: process.env.SMTP_USER,
                    to,
                    subject: 'Активация аккаунта https://depapp.ru',
                    text: '',
                    html: 
                        `
                            <div>
                                <h1>Для активации пройдите по ссылке</h1>
                                <a href=${activatedLink}">${activatedLink}</a>
                            </div>
                        `
                })
            } catch (error) {
                console.log(error)
            }            
    }
}

module.exports = new MailService()