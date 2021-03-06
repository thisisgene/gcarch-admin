import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'

import { deleteNews } from '../../../../actions/newsActions'

import cx from 'classnames'
import globalStyles from '../../common/Bootstrap.module.css'
import styles from './News.module.sass'

class NewsListItem extends Component {
  onClickDelete = id => {
    this.props.deleteNews(id)
  }
  render() {
    const { item } = this.props
    return (
      <div className={styles['news-list--item']}>
        <button
          className={cx(globalStyles['btn'], globalStyles['btn-link'])}
          onClick={this.onClickDelete.bind(this, item._id)}
        >
          <i className="fa fa-minus-circle" />
        </button>
        <NavLink
          activeClassName={styles['active']}
          to={`/admin/aktuelles/${item._id}`}
        >
          {item.title}
        </NavLink>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  news: state.news
})

export default connect(
  mapStateToProps,
  { deleteNews }
)(NewsListItem)
