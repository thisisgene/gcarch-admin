import React, { Component } from 'react'

import NewsInput from './NewsInput'
import NewsListItem from './NewsListItem'

import styles from './News.module.sass'

class NewsList extends Component {
  render() {
    const { news } = this.props
    return (
      <div className={styles['news-list']}>
        <NewsInput />
        {news.news &&
          news.news.map((item, index) => (
            <NewsListItem key={index} item={item} />
          ))}
      </div>
    )
  }
}

export default NewsList
