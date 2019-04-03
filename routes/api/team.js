const express = require('express')
const router = express.Router()
const passport = require('passport')
const marked = require('marked')

// image upload
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')

const validateProjectInput = require('../../validation/team')

const Team = require('../../models/Team')

module.exports = router

// Get all Team members
router.get('/', (req, res) => {
  // res.json({ msg: 'Jubidu' })
  const errors = {}
  Team.find({ isDeleted: false })
    .sort('position')
    .exec()
    .then(team => {
      if (team === undefined || team.length === 0) {
        return res.json({ noteam: 'Noch keine Beiträge.' })
      }
      res.json(team)
    })
    .catch(err => res.status(404).json(err))
})

// Get team by ID
router.get('/id/:id', (req, res) => {
  const errors = {}
  Team.findOne({ _id: req.params.id, isDeleted: false })
    .populate('lastEdited.user', ['name'])
    .then(member => {
      if (!member) {
        errors.noteam = 'Kein Beitrag mit dieser ID.'
        return res.status(404).json(errors.noteam)
      }
      console.log(member)
      res.json(member)
    })
    .catch(err => {
      errors.team = 'Projekt nicht gefunden.'
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
    const member = await Team.findOne({ title: body.title, isDeleted: false })
    if (member) {
      errors.title = 'Ein Team Mitglied mit diesem Namen existiert bereits.'
      return res.status(400).json(errors)
    } else {
      // Get fields
      const memberFields = {}
      if (body.title) {
        memberFields.title = body.title
      }
      const newMember = new Team(memberFields)
      newMember.save(async () => {
        const member = await Team.find({ isDeleted: false })
        res.json(member)
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
    console.log('description', body.descriptionMarkdown)
    const updateItem = {}
    if (body.title) updateItem.title = body.title
    if (body.email) updateItem.email = body.email
    if (body.descriptionMarkdown) {
      updateItem.descriptionMarkdown = body.descriptionMarkdown
      updateItem.descriptionHtml = marked(body.descriptionMarkdown, {
        sanitize: true
      })
    }

    Team.findByIdAndUpdate(body.id, { $set: updateItem }, { new: true })
      .then(teamMember => res.json(teamMember))
      .catch(err => {
        errors.project = 'Projekt nicht gefunden.'
        return res.status(404).json(errors)
      })
  }
)

// Sort Team
router.post(
  '/sort',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const list = req.body.teamList
    const result = list.map(async (item, index) => {
      Team.findOneAndUpdate(
        { _id: item._id },
        { position: index },
        { safe: true, new: true }
      )
        .then(item => {
          console.log(item.title, ': ', item.position)
        })
        .catch(err => {
          if (err) console.log(err)
        })
    })
    Promise.all(result).then(() => {
      res.send('success')
    })
  }
)

// Delete team member
router.get(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Team.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true })
      .then(async teamMember => {
        const team = await Team.find({ isDeleted: false })
        res.json(team)
      })
      .catch(err => {
        errors.team = 'Beitrag nicht gefunden.'
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

          cb(null, `team/${body.id}/${file.originalname}`)
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
      Team.findOneAndUpdate(
        { _id: body.id },
        { $push: { images: newImage } },
        { safe: true, new: true }
      )
        .then(teamMember => {
          res.send(teamMember)
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
  '/delete_image/:teamid/:imgid',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const teamId = req.params.teamid
    const imgId = req.params.imgid
    console.log(imgId)
    Team.findById(teamId)
      .then(member => {
        member.images
          .filter(img => {
            console.log('equal: ', img._id == imgId)
            return img._id == imgId
          })
          .map(img => {
            console.log('hallo', img)
            img.isDeleted = true
          })

        member.save(err => {
          if (err) res.send(err)
          else {
            res.json(member)
          }
        })
      })
      .catch(err => {
        res.json(err)
      })
  }
)
