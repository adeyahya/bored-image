// @flow
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import request from 'superagent'
import BoredImage from './Image'

type State = {
  data: Array<any>,
  isLoading: boolean
}

class App extends React.Component<{},State> {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      isLoading: true
    }
  }
  componentWillMount() {
    let self = this
    request.get('https://unsplash-api.now.sh/api/photos')
      .end(function(err, res) {
        if (err)
          return
        
        self.setState({
          data: res.body,
          isLoading: false
        })
      })
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
            placeholder={ item.urls.thumb }/>
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
        { this.state.isLoading 
        ? <p>Loading data ...</p>
        : this.renderImages() }
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
