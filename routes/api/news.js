const express = require('express')
const router = express.Router()
const passport = require('passport')
const marked = require('marked')

// image upload
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

const News = require('../../models/News')

module.exports = router

// Get all News
router.get('/', (req, res) => {
  // res.json({ msg: 'Jubidu' })
  const errors = {}
  News.find({ isDeleted: false })
    .sort('-date')
    .exec()
    .then(news => {
      if (news === undefined || news.length === 0) {
        return res.json({ nonews: 'Noch keine Beiträge.' })
      }
      res.json(news)
    })
    .catch(err => res.status(404).json(err))
})

// Get News by ID
router.get('/id/:id', (req, res) => {
  const errors = {}
  News.findOne({ _id: req.params.id, isDeleted: false })
    .populate('lastEdited.user', ['name'])
    .then(news => {
      if (!news) {
        errors.nonews = 'Kein Beitrag mit dieser ID.'
        return res.status(404).json(errors.nonews)
      }
      console.log(news)
      res.json(news)
    })
    .catch(err => {
      errors.news = 'Projekt nicht gefunden.'
      return res.status(404).json(errors)
    })
})

// Create News
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const body = req.body
    const errors = {}
    console.log(body.title)
    const news = await News.findOne({ title: body.title, isDeleted: false })
    if (news) {
      errors.title = 'Ein Projekt mit diesem Namen existiert bereits.'
      return res.status(400).json(errors)
    } else {
      // Get fields
      const newsFields = {}
      if (body.title) {
        newsFields.title = body.title
      }
      const newNews = new News(newsFields)
      newNews.save(async () => {
        const news = await News.find({ isDeleted: false })
        res.json(news)
      })
    }
  }
)

// Update News
router.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const body = req.body
    console.log('linkExternal', body.linkExternal)
    const updateItem = {}
    if (body.title) updateItem.title = body.title
    if (body.link) updateItem.link = body.link
    if (body.linkExternal !== undefined)
      updateItem.linkExternal = body.linkExternal
    if (body.date) updateItem.date = body.date
    if (body.descriptionMarkdown) {
      updateItem.descriptionMarkdown = body.descriptionMarkdown
      updateItem.descriptionHtml = marked(body.descriptionMarkdown, {
        sanitize: true
      })
    }

    News.findByIdAndUpdate(body.id, { $set: updateItem }, { new: true })
      .then(newsItem => res.json(newsItem))
      .catch(err => {
        errors.project = 'Projekt nicht gefunden.'
        return res.status(404).json(errors)
      })
  }
)

// Delete News
router.get(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    News.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true })
      .then(async newsItem => {
        const news = await News.find({ isDeleted: false })
        res.json(news)
      })
      .catch(err => {
        errors.news = 'Beitrag nicht gefunden.'
        return res.status(404).json(errors)
      })
  }
)

// Image upload
router.post(
  '/image_upload',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let body

    const s3secret = require('../../config/keys').s3secret
    const s3key = require('../../config/keys').s3key
    const spacesEndpoint = new aws.Endpoint('ams3.digitaloceanspaces.com')
    const s3 = new aws.S3({
      endpoint: spacesEndpoint,
      signatureVersion: 'v4',
      accessKeyId: s3key,
      secretAccessKey: s3secret
    })
    const upload = multer({
      storage: multerS3({
        s3: s3,
        bucket: 'gc-arch',
        acl: 'public-read',
        key: function(req, file, cb) {
          console.log('body: ', req.body)
          body = req.body

          cb(null, `news/${body.id}/${file.originalname}`)
        }
      })
    }).array('file', 1)

    upload(req, res, function(error) {
      if (error) {
        res.send(err)
      }
      const body = req.body
      // const imgName = body.name.replace(/ /g, '_')
      const newImage = {
        originalName: body.name
      }
      News.findOneAndUpdate(
        { _id: body.id },
        { $push: { images: newImage } },
        { safe: true, new: true }
      )
        .then(news => {
          res.send(news)
        })
        .catch(err => {
          console.log('noo fail')
          res.send(err)
        })
    })
  }
)

// Delete image
router.get(
  '/delete_image/:newsid/:imgid',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const newsId = req.params.newsid
    const imgId = req.params.imgid
    console.log(imgId)
    News.findById(newsId)
      .then(news => {
        news.images
          .filter(img => {
            console.log('equal: ', img._id == imgId)
            return img._id == imgId
          })
          .map(img => {
            console.log('hallo', img)
            img.isDeleted = true
          })

        news.save(err => {
          if (err) res.send(err)
          else {
            res.json(news)
          }
        })
      })
      .catch(err => {
        res.json(err)
      })
  }
)
