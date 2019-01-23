const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  location: {
    type: String
  },
  leadDescriptionMarkdown: {
    type: String
  },
  leadDescriptionHtml: {
    type: String
  },
  descriptionMarkdown: {
    type: String
  },
  descriptionHtml: {
    type: String
  },
  lastEdited: {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    date: {
      type: Date
    }
  },

  images: [
    {
      originalName: {
        type: String,
        required: true
      },
      title: {
        type: String
      },
      description: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      position: {
        // Positioning inside project view.
        type: Number
      },
      isBackground: {
        // If 'true', will show up as Project page background. (Only one image per project.)
        type: Boolean
      },
      gridPosition: {
        // Declares positioning on the projects grid (Top 10 only). Multiple images per project possible.
        type: String
      },
      isVisible: {
        type: Boolean,
        default: true
      },
      isDeleted: {
        type: Boolean,
        default: false
      }
    }
  ],
  isHomePage: {
    type: Boolean,
    default: false
  },
  backgroundImage: {
    type: Object
  },
  topTenOnGrid: {
    type: Boolean
  },
  positionOnGrid: {
    // If (topTenOnGrid) -> Where project shows up on project page grid. Number between 1 and 10.
    type: Number
  },
  typeOfFormatOnGrid: {
    // 'landscape', 'portrait' or 'square'
    type: String
  },
  importanceOnGrid: {
    // If (!topTenOnGrid) -> where project is 'weighed' on project page grid.
    type: Number
  },
  sizeOnGrid: {
    // If (!topTenOnGrid) -> Number between 1 and 3.
    type: Number
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  position: {
    type: Number
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

module.exports = Project = mongoose.model('projects', ProjectSchema)
