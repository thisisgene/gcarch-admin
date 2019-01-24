const express = require('express')
const router = express.Router()
const passport = require('passport')

const News = require('../../models/News')

module.exports = router

// Get all News
router.get('/', (req, res) => {
  // res.json({ msg: 'Jubidu' })
  const errors = {}
  News.find({ isDeleted: false })
    .sort('position')
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
