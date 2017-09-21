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
      margin: '0 auto'
    }
    return (
      <div style={ inline }>
        { data.map((item, index) => {
          return (
            <div key={ index }>
              <BoredImage
                width={ item.width }
                height={ item.height }
                src={ item.urls.regular }
                placeholder={ item.urls.thumb }/>
              <br/>
            </div>
          )
        }) }
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
