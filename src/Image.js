// @flow
import * as React from 'react'
import * as ReactDOM from 'react-dom'

type Props = {
  src: string,
  alt?: string,
  placeholder?: string,
  color?: string,
  className?: string,
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
      backgroundColor: this.props.color ? this.props.color : '#f6f6f6',
      position: 'relative',
      width: '100%',
      margin: '0',
      overflow: 'hidden'
    },
    inlineStyleImage: {
      width: '100%',
      filter: 'blur(25px)',
      transform: 'scale(1.3)',
      height: 'auto'
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
          src={ this.state.source }
          alt={this.props.alt ? this.props.alt : 'image'}/>
      </figure>
    )
  }

  renderRealImage() : void {
    const self = this
    let img = new Image
    const node: any = ReactDOM.findDOMNode(this)
    const inlineStyle = Object.assign({}, this.state.inlineStyle, {
      height: 'auto',
      backgroundColor: 'transparent'
    })

    const inlineStyleImage = Object.assign({}, this.state.inlineStyleImage, {
      filter: 'blur(0)',
      transform: 'scale(1)'
    })

    if (this.props.placeholder) {
      this.setState({
        source: this.props.placeholder
      })
    }

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
    const node: any = ReactDOM.findDOMNode(this)
    const inlineStyle: any = Object.assign({}, this.state.inlineStyle, {
      height: this.getHeightRatio(this.props.width, this.props.height, node.parentNode.clientWidth) + 'px'
    })
    
    this.setState({
      inlineStyle: inlineStyle
    })
    const observer = new IntersectionObserver(self.observerCallback.bind(this), {
      root: null,
      rootMargin: `0px 0px ${window.innerHeight * (3 / 4)}px 0px`
    })
    observer.observe(node)
  }

  render() {
    return (
      <div className={ this.props.className ? this.props.className : "bored-image" }>
        { this.renderFigure() }
      </div>
    )
  }
}

export default BoredImage
