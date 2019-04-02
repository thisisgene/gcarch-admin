const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TeamSchema = new Schema({
  title: {
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
  link: {
    type: String
  },
  linkExternal: {
    type: Boolean
  },
  position: {
    type: Number
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

  isVisible: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

module.exports = Team = mongoose.model('team', TeamSchema)
