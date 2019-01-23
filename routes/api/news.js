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
        return res.json({ nonews: 'Noch keine Projekte.' })
      }
      res.json(news)
    })
    .catch(err => res.status(404).json(err))
})

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const body = req.body
    const news = await News.findOne({ name: body.name, isDeleted: false })
    if (news) {
      errors.name = 'Ein Projekt mit diesem Namen existiert bereits.'
      return res.status(400).json(errors)
    } else {
      // Get fields
      const newsFields = {}
      if (body.title) {
        newsFields.title = body.title
      }
      const newNews = new News(newsFields)
      newNews.save(async () => {
        const news = await News.find()
        res.json(news)
      })
    }
  }
)
