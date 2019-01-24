import React, { Component } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'

import {
  getAllNews,
  getNewsById,
  updateNews
} from '../../../../actions/newsActions'
import { deleteImage } from '../../../../actions/imageActions'

import TextFieldGroup from '../../common/TextFieldGroup'
import TextareaFieldGroup from '../../common/TextareaFieldGroup'
import ImageUpload from '../ImageUpload'

import cx from 'classnames'
import globalStyles from '../../common/Bootstrap.module.css'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './NewsContent.module.sass'

class NewsContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: props.match.params.id,
      date: new Date(),
      file: null,
      description: '',
      title: '',
      errors: {}
    }
  }
  componentDidMount() {
    const id = this.props.match.params.id
    console.log(id)
    this.props.getNewsById(id)
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.match &&
      this.props.match &&
      prevProps.match.params.id !== this.props.match.params.id
    ) {
      this.setState({ id: this.props.match.params.id })
      this.props.getNewsById(this.props.match.params.id)
    }

    if (prevProps !== this.props) {
      if (this.props.news.newsItem) {
        const news = this.props.news.newsItem
        this.setState({ title: news.title })
        this.setState({ file: news.file })
        news.date && this.setState({ date: new Date(news.date) })
        this.setState({ description: news.descriptionMarkdown })
        if (
          prevProps.news.newsItem &&
          this.props.news.newsItem.title !== prevProps.news.newsItem.title
        ) {
          this.props.getAllNews()
        }
      }
    }
  }
  onClickDelete = id => {
    this.props.deleteImage(this.state.id, id, 'news')
  }
  onDateChange = date => {
    this.setState({ date: date })
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleFile = e => {
    this.setState({
      file: e.target.files[0]
    })
  }

  onSubmit = e => {
    e.preventDefault()

    const newsData = {
      id: this.state.id,
      title: this.state.title,
      file: this.state.file,
      descriptionMarkdown: this.state.description,
      date: this.state.date
    }
    this.props.updateNews(newsData)
  }

  render() {
    const { newsItem } = this.props.news
    return (
      <div className={styles['news-content']}>
        <div className={styles['news-content--text']}>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              type="text"
              name="title"
              value={this.state.title}
              placeholder="Neuer Beitrag"
              onChange={this.onChange}
              error={this.state.errors.title}
            />
            {/* <input type="file" name="file" onChange={this.handleFile} /> */}
            <TextareaFieldGroup
              name="description"
              value={this.state.description}
              placeholder="Beschreibung"
              onChange={this.onChange}
            />
            <DatePicker
              name="date"
              className={styles['date-picker']}
              onChange={this.onDateChange}
              selected={this.state.date}
              value={this.state.date}
              dateFormat="dd-MM-YYYY"
              // locale={'de-DE'}
              // clearIcon={null}
            />

            <br />
            <input type="submit" value="Speichern" />
          </form>
        </div>
        <div className={styles['news-content--image']}>
          <ImageUpload id={this.props.match.params.id} category={'news'} />
          <div>
            {newsItem &&
              newsItem.images &&
              newsItem.images.map(image => (
                <div>
                  {!image.isDeleted && (
                    <div className={styles['news-content--image__item']}>
                      <button
                        className={cx(
                          globalStyles['btn'],
                          globalStyles['btn-link']
                        )}
                        onClick={this.onClickDelete.bind(this, image._id)}
                      >
                        <i className="fa fa-minus-circle" />
                      </button>
                      <img
                        src={`/assets/news/${this.state.id}/${
                          image.originalName
                        }`}
                        alt=""
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  news: state.news
})
export default connect(
  mapStateToProps,
  { getAllNews, getNewsById, updateNews, deleteImage }
)(NewsContent)
