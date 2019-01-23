import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import NewsList from './NewsList'
// import NewsContent from './NewsContent'
import { getAllNews } from '../../../../actions/newsActions'

// import './news.css'

class News extends Component {
  componentDidMount() {
    this.props.getAllNews()
  }
  render() {
    return (
      <div className="news">
        {this.props.news && <NewsList news={this.props.news} />}
        {/* <Route path="/news/:id" props={this.props} component={NewsContent} /> */}
      </div>
    )
  }
}

News.propTypes = {
  getAllNews: PropTypes.func.isRequired,
  // getNewsItemById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  // newsItem: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  news: state.news,
  newsItem: state.newsItem,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getAllNews }
)(News)

// export default Projects
