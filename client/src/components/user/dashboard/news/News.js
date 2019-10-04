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
              {newsItem.images[0] && (
                <>
                  {newsItem.images
                    .filter(img => !img.isDeleted)
                    .map(
                      (img, index) =>
                        index == 0 && (
                          <img
                            key={index}
                            src={`/assets/news/${newsItem._id}/${img.originalName}`}
                            alt=""
                          />
                        )
                    )}
                </>
              )}
              <div className={styles['news-info']}>
                <div className={styles['news-info-name']}>{newsItem.title}</div>
                <div
                  className={styles['news-info-description']}
                  dangerouslySetInnerHTML={{
                    __html: newsItem.descriptionHtml
                  }}
                />
                {newsItem.linkToProject && (
                  <Link
                    className={styles['link']}
                    to={`/projekte/${newsItem.link}`}
                  >
                    Zum Projekt
                  </Link>
                )}
              </div>
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
