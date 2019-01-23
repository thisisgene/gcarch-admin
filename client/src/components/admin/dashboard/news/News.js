import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import NewsList from './NewsList'
import NewsContent from './NewsContent'
import { getAllNewsItems, getNewsItemById } from '../../../actions/newsActions'

import './news.css'

class News extends Component {
  componentDidMount() {
    // console.log(this.props)
  }
  render() {
    return (
      <div className="news">
        <NewsList news={this.props.news} />
        <Route path="/news/:id" props={this.props} component={NewsContent} />
      </div>
    )
  }
}

News.propTypes = {
  getAllNewsItems: PropTypes.func.isRequired,
  getNewsItemById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  newsItem: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  newsItem: state.newsItem,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getAllNewsItems, getNewsItemById }
)(News)

// export default Projects
