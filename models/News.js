const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  handle: {
    type: String
  },
  descriptionMarkdown: {
    type: String
  },
  descriptionHtml: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  linkTo: {
    type: String
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
      isCover: {
        // If 'true', will show up on project page. (Only one image per project.)
        type: Boolean
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
  position: {
    // If (topTenOnGrid) -> Where project shows up on project page grid. Number between 1 and 10.
    type: Number
  },
  isVisible: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

module.exports = News = mongoose.model('news', NewsSchema)
