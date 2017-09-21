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

  renderRealImage() : void {
    const self = this
    let img = new Image
    img.src = this.props.src
    img.onload = function() {
      self.setState({
        isLoading: false
      })
    }
  }

  observerCallback(entries: Array<any>, observer: any) : void {
    const self = this
    entries.forEach(entry => {
      console.log('hey')
      if (entry.isIntersecting) {
        self.renderRealImage()
        observer.unobserve(entry.target)
      }
    })
  }

  componentDidMount() {
    const self = this
    const node: any = ReactDOM.findDOMNode(this)
    this.setState({
      width: node.parentNode.clientWidth
    })

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(self.observerCallback.bind(this), {})
      observer.observe(node)
    } else {
      import(/* webpackChunkName: "intersection-observer" */ 'intersection-observer').then(() => {
        const observer = new IntersectionObserver(self.observerCallback.bind(this), {})
        observer.observe(node)
      })
    }
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
