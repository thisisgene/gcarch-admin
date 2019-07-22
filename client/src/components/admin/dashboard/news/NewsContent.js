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
import CustomSelectBox from '../../common/CustomSelectBox'

import cx from 'classnames'
import globalStyles from '../../common/Bootstrap.module.css'
import commonStyles from '../../common/Common.module.sass'
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
      link: '',
      linkToProject: false,
      errors: {}
    }
  }
  componentDidMount() {
    this.setState({
      id: this.props.match.params.id,
      date: new Date(),
      file: null,
      description: '',
      title: '',
      link: '',
      linkToProject: false,
      errors: {}
    })
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
      console.log('UPDATE')
      this.setState({
        id: this.props.match.params.id,
        date: new Date(),
        file: null,
        description: '',
        title: '',
        link: '',
        linkToProject: false,
        errors: {}
      })
      this.props.getNewsById(this.props.match.params.id)
    }

    if (
      (!prevProps.news.newsItem && prevProps !== this.props) ||
      (prevProps.news.newsItem &&
        prevProps.news.newsItem !== this.props.news.newsItem)
    ) {
      if (this.props.news.newsItem) {
        const news = this.props.news.newsItem
        this.setState({
          title: news.title ? news.title : '',
          link: news.link ? news.link : '',
          linkToProject: news.linkToProject ? news.linkToProject : false,
          file: news.file ? news.file : null,
          date: new Date(news.date ? news.date : ''),
          description: news.descriptionMarkdown ? news.descriptionMarkdown : ''
        })
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
    if (e.target.name !== 'linkToProject') {
      this.setState({ [e.target.name]: e.target.value })
    } else {
      console.log(e.target.checked)
      this.setState({ [e.target.name]: e.target.checked })
    }
  }
  handleFile = e => {
    this.setState({
      file: e.target.files[0]
    })
  }

  selectProject = id => {
    this.setState({
      link: id
    })
    console.log('here: ', id)
  }

  onSubmit = e => {
    e.preventDefault()
    console.log(this.state.linkToProject)
    const newsData = {
      id: this.state.id,
      title: this.state.title,
      link: this.state.link,
      linkToProject: this.state.linkToProject,
      file: this.state.file,
      descriptionMarkdown: this.state.description,
      date: this.state.date
    }
    this.props.updateNews(newsData)
  }

  render() {
    const { newsItem, saving } = this.props.news
    return (
      <div className={styles['content-container']}>
        {newsItem && (
          <div
            className={cx(styles['news-content'], {
              [styles['saving']]: saving
            })}
          >
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
                <div className={styles['news-content--text__description']}>
                  <TextareaFieldGroup
                    name="description"
                    value={this.state.description}
                    placeholder="Beschreibung"
                    onChange={this.onChange}
                  />
                </div>
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
                <input
                  id="linkToProject"
                  type="checkbox"
                  name="linkToProject"
                  checked={this.state.linkToProject}
                  defaultChecked={newsItem && newsItem.linkToProject}
                  onChange={this.onChange}
                />{' '}
                <label htmlFor="linkToProject">Link zum Projekt</label>
                {this.state.linkToProject && (
                  // <TextFieldGroup
                  //   type="text"
                  //   name="link"
                  //   value={this.state.link}
                  //   placeholder="Projekt ID"
                  //   onChange={this.onChange}
                  //   error={this.state.errors.link}
                  // />
                  <CustomSelectBox
                    selected={this.state.link}
                    selectProject={this.selectProject}
                  />
                )}
                <br />
                <input
                  className={commonStyles['submit-button']}
                  type="submit"
                  value="Speichern"
                />
              </form>
            </div>
            <div className={styles['news-content--image']}>
              <ImageUpload id={this.props.match.params.id} category={'news'} />
              <div>
                {newsItem &&
                  newsItem.images &&
                  newsItem.images
                    .filter(image => !image.isDeleted)
                    .map((image, index) => (
                      <div key={index}>
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
        )}
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
