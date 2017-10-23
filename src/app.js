// @flow
require('babel-polyfill')
import React from 'react'
import ReactDOM from 'react-dom'
import request from 'superagent'
import BoredImage from './Image'

type State = {
  data: Array<any>,
  isLoading: boolean,
  page: number
}

class App extends React.Component<{},State> {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isLoading: false,
      page: 1
    }
  }

  intersect: any = this._intersect.bind(this)

  async _loadData() {
    if (this.state.isLoading) {
      return
    }

    this.setState({
      isLoading: true
    })

    const res = await request.get(`https://unsplash-server.ihavemind.com/api/photos/curated/?per_page=20&page=${this.state.page}`)
    const data = JSON.parse(res.text)
    this.setState({
      data: [
        ...this.state.data,
        ...data
      ],
      isLoading: false,
      page: this.state.page + 1
    })
  }

  _intersect(entries, observer) {
    const self = this
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        self._loadData()
      }
    })
  }

  componentDidMount() {
    require('intersection-observer')
    const observer = new IntersectionObserver(this.intersect, {})
    observer.observe(document.querySelector("#intersectMe"))
  }

  renderImages() {
    return this.state.data.map((item, index) => {
      return (
        <div key={ index }>
          <section>
            <h2>Image by { item.user.name }</h2>
            <p>
              { item.user.bio
              ? item.user.bio
              : 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates illum odit perspiciatis similique mollitia magni sapiente quasi quibusdam excepturi nostrum, voluptas exercitationem doloribus unde, voluptatum expedita voluptatibus debitis esse? Vitae!' }
            </p>
          </section>
          <BoredImage
            width={ item.width }
            height={ item.height }
            src={ item.urls.regular }
            placeholder={ item.urls.thumb }
            color={ item.color }/>
        </div>
      )
    })
  }

  render() {
    const inline = {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '0 5px',
      boxSizing: 'border-box',
      fontFamily: "SF Optimized, system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif",
      letterSpacing: "-0.01em",
      color: "#333"
    }
    return (
      <div style={ inline }>
        <h1>React Bored Image</h1>
        <p>Lazy Load image using blurry placeholder</p>
        { this.renderImages() }
        { this.state.isLoading 
        ? <p>Loading data ...</p>
        : null }

        <div id="intersectMe"></div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
