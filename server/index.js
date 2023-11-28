require('dotenv').config()
const express = require('express');
const RegistrationRoutes = require('./routes/registration.routes')
const LoginRoutes = require('./routes/login.routes')
const LogoutRoutes = require('./routes/logout.routes')
const UsersRoutes = require('./routes/users.routes')
const zapisiRouter = require('./routes/zapisi.routes')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error.midleware')

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_DEV_URL || process.env.CLIENT_PROD_URL
}))
app.use('/api',RegistrationRoutes, LoginRoutes, LogoutRoutes, UsersRoutes, zapisiRouter)
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server work on port: ${PORT}`);
});
