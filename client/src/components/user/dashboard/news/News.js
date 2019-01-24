import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { getAllNews } from '../../../../actions/newsActions'

import store from '../../../../store'
import {
  clearCurrentProject,
  getAllProjects,
  hasBackgroundImage
} from '../../../../actions/projectActions'

import CustomLink from '../../common/CustomLink'

import styles from './News.module.sass'
import NewsListItem from '../../../admin/dashboard/news/NewsListItem'

class News extends Component {
  componentDidMount() {
    this.props.getAllNews()
    store.dispatch(clearCurrentProject())
    this.props.hasBackgroundImage(false)
    // if (!this.props.project.projects) {
    //   this.props.getAllProjects()
    // }
  }
  render() {
    const { news } = this.props.news
    return (
      <div className={styles['news-container']}>
        {news &&
          news.map(newsItem => (
            <div key={newsItem._id} className={styles['news-item']}>
              <CustomLink
                isExternal={newsItem.isExternal}
                className={styles['link']}
                text={'test'}
                to={`/${newsItem.link}`}
                inside={
                  <div>
                    <img
                      src={`/assets/news/${newsItem._id}/${
                        newsItem.images[0].originalName
                      }`}
                      alt=""
                    />
                    <div className={styles['news-info']}>
                      <div className={styles['news-info-name']}>
                        {newsItem.title}
                      </div>
                      <div
                        className={styles['news-info-description']}
                        dangerouslySetInnerHTML={{
                          __html: newsItem.descriptionHtml
                        }}
                      >
                        {/* Das ist unser neues Projekt. */}
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  news: state.news
})

export default connect(
  mapStateToProps,
  { hasBackgroundImage, getAllProjects, getAllNews }
)(News)
