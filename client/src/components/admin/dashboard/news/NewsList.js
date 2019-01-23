import React, { Component } from 'react'

export default class NewsList extends Component {
  render() {
    const { news } = this.props
    console.log(news)
    return <div>{news.news && news.news.map(item => <p>{item.title}</p>)}</div>
  }
}
