// @flow
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import BoredImage from './Image'

class App extends React.Component<{}> {
  render() {
    return (
      <div>
        <BoredImage
          width={ 2000 }
          height={ 857 }
          src='https://softwareengineeringdaily.com/wp-content/uploads/2015/08/nodejs_logo_green.jpg'/>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))
