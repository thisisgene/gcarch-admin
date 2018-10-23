const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load project model
const Project = require('../../models/Project')
const User = require('../../models/User')

// Load validation
const validateProjectInput = require('../../validation/project')

// @route   GET api/projects/test
// @desc    Tests projects route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Projects Works' }))

module.exports = router

// @route   GET api/projects
// @desc    Get projects
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {}
    Project.find()
      .then(projects => {
        if (projects.length === 0) {
          errors.noprojects = 'Noch keine Projekte.'
          return res.status(404).json(errors.noprojects)
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
        const newProject = new Project({
          name: projectFields.name,
          title: projectFields.title,
          handle: projectFields.handle
        })
        newProject
          .save()
          .then(project => res.json(project))
          .catch(err => res.json(err))
      }
    })
  }
)
