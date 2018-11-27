const express = require('express')
const router = express.Router()
const passport = require('passport')
const marked = require('marked')

// Load project model
const Project = require('../../models/Project')

// Load input validation
const validateProjectInput = require('../../validation/project')

module.exports = router

// @route   GET api/projects
// @desc    Get all projects
// @access  Public
router.get('/', (req, res) => {
  // res.json({ msg: 'Jubidu' })
  const errors = {}
  Project.find({ isDeleted: false })
    .then(projects => {
      if (projects === undefined || projects.length === 0) {
        return res.json({ noprojects: 'Noch keine Projekte.' })
      }
      res.json(projects)
    })
    .catch(err => res.status(404).json(err))
})

// @route   POST api/projects
// @desc    Create a project
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const body = req.body
    console.log(body.name)
    const { errors, isValid } = await validateProjectInput(body)

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors)
    }

    // Check if project.name already exists
    const project = await Project.findOne({ name: body.name })
    if (project) {
      errors.name = 'Ein Projekt mit diesem Namen existiert bereits.'
      return res.status(400).json(errors)
    } else {
      // Get fields
      const projectFields = {}
      if (body.name) {
        projectFields.name = body.name
        // projectFields.title = body.name
        // projectFields.handle = body.name.replace(/\s/g, '_')
      }
      const newProject = new Project(projectFields)
      newProject.save(async project => {
        const projects = await Project.find()
        res.json(projects)
      })
    }
  }
)

// @route   GET api/projects/id/:id
// @desc    Get project by id
// @access  Public
router.get('/id/:id', (req, res) => {
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
})

// @route   POST api/projects/update/:id
// @desc    Update project by id.
// @access  Private
router.post(
  '/update',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const body = req.body
    console.log(body)
    const projectFields = {}
    if (body.name) projectFields.name = body.name
    if (body.title) projectFields.title = body.title
    if (body.handle) projectFields.handle = body.handle
    if (body.descriptionMarkdown) {
      projectFields.descriptionMarkdown = body.descriptionMarkdown
      projectFields.descriptionHtml = marked(body.descriptionMarkdown, {
        sanitize: true
      })
    }
    if (body.topTenOnGrid) projectFields.topTenOnGrid = body.topTenOnGrid
    if (body.positionOnGrid) projectFields.positionOnGrid = body.positionOnGrid
    if (body.typeOfFormatOnGrid)
      projectFields.typeOfFormatOnGrid = body.typeOfFormatOnGrid
    if (body.importanceOnGrid)
      projectFields.importanceOnGrid = body.importanceOnGrid
    if (body.sizeOnGrid) projectFields.sizeOnGrid = body.sizeOnGrid
    if (body.isVisible !== undefined) projectFields.isVisible = body.isVisible
    projectFields.lastEdited = {
      user: req.user,
      date: new Date()
    }
    Project.findByIdAndUpdate(body.id, { $set: projectFields }, { new: true })
      .then(project => res.json(project))
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

// @route   POST api/projects/img_upload/:id
// @desc    Upload images for specific project by id.
// @access  Private
router.post(
  '/image_upload',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const file = req.files.file
    const body = req.body
    const newImage = {
      originalName: body.name
    }
    Project.findByIdAndUpdate(
      // FIXME: If project has no background image, make first image to upload the background image!
      body.id,
      { $push: { images: newImage } },
      { safe: true, new: true }
    )
      .then(project => {
        file.mv(`public/${body.id}/${req.body.name}`, function(err) {
          if (err) {
            console.log(err)
            return res.status(500).send(err)
          }
        })
        res.json(project)
      })
      .catch(err => {
        errors.project = 'Projekt nicht gefunden.'
        return res.status(404).json(errors)
      })
  }
)
// @route   GET api/projects/set_home_project/:id
// @desc    Set project to be displayed on home screen
// @access  Private
router.get(
  '/set_home_project/:projectid',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    Project.findOneAndUpdate({ isHomePage: true }, { isHomePage: false }).then(
      async () => {
        const project = await getProjectById(req.params.projectid)
        if (project) {
          project.isHomePage = true
          project.save(async () => {
            const projects = await getProjectsByQuery({ isDeleted: false })
            console.log(projects)
            res.json(projects)
          })
        }
      }
    )
  }
)

// @route   GET api/projects/delete_image/:id
// @desc    Delete image by id.
// @access  Private
router.get(
  '/delete_image/:projectid/:imgid',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const projectId = req.params.projectid
    const imgId = req.params.imgid
    // console.log(projectId)
    Project.findById(projectId)
      .then(project => {
        let topTenOnGrid = false
        project.images.forEach(img => {
          if (img._id == imgId) {
            img.isDeleted = true
            img.gridPosition = '-'
          }
          if (
            img.isDeleted == false &&
            img.gridPosition &&
            img.gridPosition !== '-' &&
            img.gridPosition !== null
          ) {
            topTenOnGrid = true
          }
        })
        project.topTenOnGrid = topTenOnGrid
        project.save(err => {
          if (err) res.send(err)
          else {
            res.json(project)
          }
        })
      })
      .catch(err => {
        res.json(err)
      })
  }
)

// @route   GET api/projects/get_project_after_ten
// @desc    Get all projects after rank 10
// @access  Public
router.get('/get_projects_after_ten', async (req, res) => {
  const query = { $or: [{ topTenOnGrid: false }, { topTenOnGrid: null }] }
  let projects = await getProjectsByQuery(query)
  console.log(projects)
  res.json(projects)
})

// @route   GET api/projects/get_project_grid
// @desc    Get all project of the top 10
// @access  Public
router.get('/get_project_grid', async (req, res) => {
  const query = { topTenOnGrid: true, isVisible: true }
  let projects = await getProjectsByQuery(query)
  res.json(projects)
})

const getProjectById = async id => {
  return Project.findById(id)
}
const getProjectByQuery = async query => {
  return Project.findOne(query)
}
const getProjectsByQuery = async query => {
  return Project.find(query)
}

const updateRank = async (project, imageId, position) => {
  if (project !== null) {
    let topTenOnGrid = false
    project.images.forEach(img => {
      if (img.gridPosition == position) {
        img.gridPosition = '-'
      }
      if (img._id == imageId) {
        img.gridPosition = position
      }
      if (
        img.isDeleted == false &&
        img.gridPosition &&
        img.gridPosition !== '-' &&
        img.gridPosition !== null
      ) {
        topTenOnGrid = true
      }
    })
    project.topTenOnGrid = topTenOnGrid
    return project
  }
}

const UpdateIfDifferentProject = async (project, compareId, body) => {
  if (project._id.equals(compareId)) {
    return project
  } else {
    let topTenOnGrid = false
    project.images.forEach(img => {
      if (img.gridPosition == body.position) {
        img.gridPosition = '-'
      }
      if (
        img.isDeleted == false &&
        img.gridPosition &&
        img.gridPosition !== '-' &&
        img.gridPosition !== null
      ) {
        topTenOnGrid = true
      }
    })
    project.topTenOnGrid = topTenOnGrid
    return project
  }
}

// @route   POST api/projects/set_grid_position
// @desc    Set position of project/image on the projects grid.
// @access  Private
router.post(
  '/set_grid_position',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let project = await getProjectById(req.body.projectId)
    const query = {
      'images.gridPosition': req.body.position
    }
    let formerRankProject = await getProjectByQuery(query)

    project = await updateRank(project, req.body.imageId, req.body.position)

    if (formerRankProject !== null) {
      formerRankProject = await UpdateIfDifferentProject(
        formerRankProject,
        project._id,
        req.body
      )
      formerRankProject.save()
    }

    project
      .save()
      .then(project => res.json(project))
      .catch(err => res.json(err))
  }
)

router.post(
  '/set_background_image',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let project = await getProjectById(req.body.projectId)
    project.images.forEach(img => {
      if (img._id.equals(req.body.imageId)) {
        project.backgroundImage = img
      }
    })
    project
      .save()
      .then(project => {
        res.json(project)
      })
      .catch(err => res.json(err))
  }
)

router.post(
  '/set_image_visibility',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let project = await getProjectById(req.body.projectId)
    project.images.forEach(img => {
      if (img._id.equals(req.body.imageId)) {
        img.isVisible = req.body.state
      }
    })
    project
      .save()
      .then(project => {
        res.json(project)
      })
      .catch(err => res.json(err))
  }
)
