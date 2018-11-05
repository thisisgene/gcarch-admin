const express = require('express')
const router = express.Router()
const passport = require('passport')
const marked = require('marked')

// Load project model
const Project = require('../../models/Project')
const User = require('../../models/User')

// Load input validation
const validateProjectInput = require('../../validation/project')

// @route   GET api/projects/test
// @desc    Tests projects route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Projects Works' }))

module.exports = router

// @route   GET api/projects
// @desc    Get all projects
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // res.json({ msg: 'Jubidu' })
    const errors = {}
    Project.find()
      .then(projects => {
        if (projects === undefined || projects.length === 0) {
          return res.json({ noprojects: 'Noch keine Projekte.' })
        }
        res.json(projects)
      })
      .catch(err => res.status(404).json(err))
  }
)

// @route   POST api/projects
// @desc    Create a project
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const body = req.body

    const { errors, isValid } = validateProjectInput(body)

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    // Check if project.name already exists
    Project.findOne({ name: body.name }).then(project => {
      if (project) {
        errors.name = 'Ein Projekt mit diesem Namen existiert bereits.'
        return res.status(400).json(errors)
      } else {
        // Get fields
        const projectFields = {}
        if (body.name) {
          projectFields.name = body.name
          projectFields.title = body.name
          projectFields.handle = body.name.replace(/\s/g, '_')
        }
        new Project(projectFields)
          .save()
          .then(project => res.json(project))
          .catch(err => res.json(err))
      }
    })
  }
)

// @route   GET api/projects/id/:id
// @desc    Get project by id
// @access  Private
router.get(
  '/id/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {}
    Project.findById(req.params.id)
      .populate('lastEdited.user', ['name'])
      .then(project => {
        if (!project) {
          errors.noprojects = 'Kein Projekt mit dieser ID.'
          return res.status(404).json(errors.noprojects)
        }
        res.json(project)
      })
      .catch(err => {
        errors.project = 'Projekt nicht gefunden.'
        return res.status(404).json(errors)
      })
  }
)

// @route   POST api/projects/update/:id
// @desc    Update project by id.
// @access  Private
router.post(
  '/update/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const body = req.body

    const { errors, isValid } = validateProjectInput(body)

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    // Check if project.name already exists
    Project.findById(req.params.id)
      .then(project => {
        if (!project) {
          errors.project = 'Projekt nicht gefunden.'
          return res.status(400).json(errors)
        } else {
          // Get fields
          const projectFields = {}
          if (body.name) projectFields.name = body.name
          if (body.title) projectFields.title = body.title
          if (body.handle) projectFields.handle = body.handle
          if (body.descriptionMarkdown) {
            projectFields.descriptionMarkdown = body.descriptionMarkdown
            projectFields.descriptionHtml = marked(body.descriptionMarkdown)
          }
          if (body.topTenOnGrid) projectFields.topTenOnGrid = body.topTenOnGrid
          if (body.positionOnGrid)
            projectFields.positionOnGrid = body.positionOnGrid
          if (body.typeOfFormatOnGrid)
            projectFields.typeOfFormatOnGrid = body.typeOfFormatOnGrid
          if (body.importanceOnGrid)
            projectFields.importanceOnGrid = body.importanceOnGrid
          if (body.sizeOnGrid) projectFields.sizeOnGrid = body.sizeOnGrid
          if (body.isVisible) projectFields.isVisible = body.isVisible
          projectFields.lastEdited = {
            user: req.user,
            date: new Date()
          }
          Project.findByIdAndUpdate(
            req.params.id,
            { $set: projectFields },
            { new: true }
          ).then(project => res.json(project))
        }
      })
      .catch(err => {
        errors.project = 'Projekt nicht gefunden.'
        return res.status(404).json(errors)
      })
  }
)

// @route   GET api/projects/delete/:id
// @desc    Mark project as deleted.
// @access  Private
router.get(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Project.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true })
      .then(project => res.json(project))
      .catch(err => {
        errors.project = 'Projekt nicht gefunden.'
        return res.status(404).json(errors)
      })
  }
)

// @route   POST api/projects/:id/img_upload
// @desc    Upload images for specific project by id.
// @access  Private
router.post(
  '/:id/img_upload',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // FIXME: Files should be iterable!
    const files = req.files
    files.map(file => {
      console.log(file)
    })
  }
)
