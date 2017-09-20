// @flow
import * as React from 'react'
import * as ReactDOM from 'react-dom'

type Props = {
  src: string,
  alt?: string,
  placeholder?: string,
  width: number,
  height: number
}

type State = {
  isLoading: boolean,
  width: number
}

class BoredImage extends React.Component<Props, State> {
  state = {
    isLoading: true,
    width: 0
  }

  getHeightRatio(originalWidth: number, originalHeight: number, newWidth: number) : number {
    return (originalHeight / originalWidth) * newWidth
  }

  renderFigure() : void {
    const self = this
    const inlineStyle = {
      width: '100%',
      backgroundColor: '#333',
      height: `${ this.getHeightRatio(this.props.width, this.props.height, this.state.width) }px`,
      margin: '0'
    }
    return (
      <figure style={ inlineStyle }>
        { this.state.isLoading
        ? null
        : <img style={ inlineStyle } src={ self.props.src }/> }
      </figure>
    )
  }

  componentDidMount() {
    const self = this
    let img = new Image
    img.src = this.props.src
    img.onload = function() {
      self.setState({
        isLoading: false
      })
    }

    const node: any = ReactDOM.findDOMNode(this)
    this.setState({
      width: node.parentNode.clientWidth
    })
  }

  render() {
    return (
      <div>
        { this.renderFigure() }
      </div>
    )
  }
}

export default BoredImage
