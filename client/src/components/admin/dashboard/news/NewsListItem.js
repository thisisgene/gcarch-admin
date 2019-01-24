import React, { Component } from 'react'
import { connect } from 'react-redux'

import { NavLink } from 'react-router-dom'

import { deleteNews } from '../../../../actions/newsActions'

class NewsListItem extends Component {
  onClickDelete = id => {
    this.props.deleteNews(id)
  }
  render() {
    const { item } = this.props
    return (
      <div>
        <button onClick={this.onClickDelete.bind(this, item._id)}>
          <i className="fa fa-minus-circle" />
        </button>
        <NavLink to={`/admin/aktuelles/${item._id}`}>{item.title}</NavLink>
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
