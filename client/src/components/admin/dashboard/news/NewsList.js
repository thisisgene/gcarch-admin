import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
export default class NewsList extends Component {
  render() {
    const { news } = this.props
    return (
      <div>
        {news.news &&
          news.news.map(item => (
            <NavLink to={`/admin/news/${item._id}`}>{item.title}</NavLink>
          ))}
      </div>
    )
  }
}
