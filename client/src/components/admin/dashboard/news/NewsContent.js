import React, { Component } from 'react'
import { connect } from 'react-redux'
import DatePicker from 'react-date-picker'

import { getAllNews, getNewsById } from '../../../../actions/newsActions'

import TextFieldGroup from '../../common/TextFieldGroup'

import styles from './NewsContent.module.sass'

class NewsContent extends Component {
  constructor() {
    super()
    this.state = {
      date: new Date(),
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
      this.props.getNewsById(this.props.match.params.id)
    }

    if (prevProps !== this.props) {
      if (this.props.news.newsItem) {
        const news = this.props.news.newsItem
        this.setState({ title: news.title })
        // this.setState({ location: news.location })
        // this.setState({ description: news.descriptionMarkdown })
        // this.setState({ leadDescription: news.leadDescriptionMarkdown })
        if (
          prevProps.news.newsItem &&
          this.props.news.newsItem.title !== prevProps.news.newsItem.title
        ) {
          this.props.getAllNews()
        }
      }
    }
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className={styles['news-content']}>
        <form action="">
          <TextFieldGroup
            type="text"
            name="title"
            value={this.state.title}
            placeholder="Neuer Beitrag"
            onChange={this.onChange}
            error={this.state.errors.title}
          />
        </form>
        <DatePicker
          name="date"
          className={styles['date-picker']}
          onChange={this.onChange}
          value={this.state.date}
          locale={'de-DE'}
          clearIcon={null}
        />
      </div>
    )
  }
}
const mapStateToProps = state => ({
  news: state.news
})
export default connect(
  mapStateToProps,
  { getAllNews, getNewsById }
)(NewsContent)
