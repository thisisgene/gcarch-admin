const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectGridItemSchema = new Schema({
  position: {
    type: Number,
    required: true
  },
  projectId: {
    type: String
  },
  projectName: {
    type: String
  },
  imageId: {
    type: String
  },
  imageName: {
    type: String
  },
  isTaken: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = ProjectGridItem = mongoose.model(
  'projectgriditems',
  ProjectGridItemSchema
)
