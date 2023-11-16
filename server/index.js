require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const LoginRoute = require('./routes/login.routes')


const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api', LoginRoute)

app.listen(PORT, () => {console.log(`Server started on http://localhost:${PORT} port`)})