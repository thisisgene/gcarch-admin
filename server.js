const express = require('express')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const bodyParser = require('body-parser')
const passport = require('passport')
const fileUpload = require('express-fileupload')
const path = require('path')
const proxy = require('express-http-proxy')

const users = require('./routes/api/users')
const projects = require('./routes/api/projects')
const news = require('./routes/api/news')
const team = require('./routes/api/team')

const AWS = require('aws-sdk')
const app = express()

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// FileUpload middleware
// app.use(
//   fileUpload({
//     createParentPath: true,
//     safeFileNames: true,
//     preserveExtension: true
//   })
// )

app.use('/public', express.static(__dirname + '/public'))

app.use('/assets', proxy('https://gc-arch.ams3.digitaloceanspaces.com'))

// DB Config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

// Use Routes
app.use('/api/users', users)
app.use('/api/projects', projects)
app.use('/api/news', news)
app.use('/api/team', team)

// Server static assets if on production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))
  // app.use('/public', express.static(__dirname + '/public')) // Serve files from public folder??

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
