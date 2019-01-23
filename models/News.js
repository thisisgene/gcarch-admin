const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsSchema = new Schema({
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

module.exports = News = mongoose.model('news', NewsSchema)
