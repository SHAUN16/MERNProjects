require('dotenv').config();
require('express-async-errors');
const { auth } = require('express-openid-connect');
//extra security packages

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


const fileUpload = require('express-fileupload');
// USE V2
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const express = require('express');
const path = require('path');
const app = express();
const {authUser} = require('./middleware/authentication')
// connectDB
const connectDB = require('./db/connect')
//routers
const authRouter = require('./routes/auth');
const jobRouter = require('./routes/jobs');
const applyRouter = require('./routes/applies');
const sendRouter = require('./routes/sendMail');
const uploadRouter = require('./routes/upload');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(rateLimiter({
  windowsMs: 15 * 60 * 1000, // 15 minutes
  max:100, //limits the ip requests to 100 per windowsMs
}))
app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss())


// extra packages
// routes
app.use(express.static(path.resolve(__dirname, './react-jobs-app-main/build')));
app.use(fileUpload({ useTempFiles: true }));

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authUser,jobRouter)
app.use('/api/v1/applies',authUser,applyRouter)
app.use('/api/v1/sendMail',authUser,sendRouter)
app.use('/api/v1/upload',authUser,uploadRouter)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './react-jobs-app-main/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
