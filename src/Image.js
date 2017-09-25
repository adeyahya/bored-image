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
  isLoading?: boolean,
  inlineStyle?: any,
  inlineStyleImage?: any,
  source?: string
}

class BoredImage extends React.Component<Props, State> {
  state = {
    isLoading: true,
    inlineStyle: {
      backgroundColor: '#f6f6f6',
      position: 'relative',
      width: '100%',
      margin: '0',
      overflow: 'hidden'
    },
    inlineStyleImage: {
      width: '100%',
      filter: 'blur(50px)'
    },
    source: ''
  }

  getHeightRatio(originalWidth: number, originalHeight: number, newWidth: number) : number {
    return (originalHeight / originalWidth) * newWidth
  }

  renderFigure() {
    return (
      <figure style={ this.state.inlineStyle }>
        <img 
          style={ this.state.inlineStyleImage }
          src={ this.state.source }/>
      </figure>
    )
  }

  renderRealImage() : void {
    const self = this
    let img = new Image
    const node: any = ReactDOM.findDOMNode(this)
    const inlineStyle = Object.assign({}, this.state.inlineStyle, {
      height: 'auto'
    })

    const inlineStyleImage = Object.assign({}, this.state.inlineStyleImage, {
      filter: 'none'
    })

    img.src = this.props.src
    img.onload = function() {
      self.setState({
        isLoading: false,
        inlineStyle: inlineStyle,
        inlineStyleImage: inlineStyleImage,
        source: self.props.src
      })
    }
  }

  observerCallback(entries: Array<any>, observer: any) : void {
    const self = this
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        self.renderRealImage()
        observer.unobserve(entry.target)
      }
    })
  }

  componentDidMount() {
    require('intersection-observer')
    const self = this

    if (this.props.placeholder) {
      this.setState({
        source: this.props.placeholder
      })
    }

    const node: any = ReactDOM.findDOMNode(this)
    const inlineStyle: any = Object.assign({}, this.state.inlineStyle, {
      height: this.getHeightRatio(this.props.width, this.props.height, node.parentNode.clientWidth) + 'px'
    })
    
    this.setState({
      inlineStyle: inlineStyle
    })
    const observer = new IntersectionObserver(self.observerCallback.bind(this), {})
    observer.observe(node)
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
