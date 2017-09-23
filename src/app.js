// @flow
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import BoredImage from './Image'
import data from '../data'

class App extends React.Component<{}> {
  componentWillMount() {
    console.log(data)
  }
  render() {
    const inline = {
      maxWidth: '400px',
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
        { data.map((item, index) => {
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
        }) }
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
