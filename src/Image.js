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
  width: number,
  inlineStyle: ?any,
  source: string
}

class BoredImage extends React.Component<Props, State> {
  state = {
    isLoading: true,
    width: 0,
    source: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAMAAAC6sdbXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NkI1ODc4RUY5ODJEMTFFN0IyMzVBQzAxOTk3RDM4NEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NkI1ODc4RjA5ODJEMTFFN0IyMzVBQzAxOTk3RDM4NEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2QjU4NzhFRDk4MkQxMUU3QjIzNUFDMDE5OTdEMzg0RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2QjU4NzhFRTk4MkQxMUU3QjIzNUFDMDE5OTdEMzg0RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuvCWAEAAAAGUExURaGhoQAAAM+3s8IAAAAOSURBVHjaYmDABwACDAAAHgABzCCyiwAAAABJRU5ErkJggg=='
  }

  getHeightRatio(originalWidth: number, originalHeight: number, newWidth: number) : number {
    return (originalHeight / originalWidth) * newWidth
  }

  renderFigure() : void {
    const inlineStyle = {
      width: '100%',
      backgroundColor: this.props.placeholder ? 'transparent' : '#333',
      height: `${ this.getHeightRatio(this.props.width, this.props.height, this.state.width) }px`,
      margin: '0',
      overflow: 'hidden'
    }

    const inlineStylePlaceholder = {
      width: '100%',
      height: `${ this.getHeightRatio(this.props.width, this.props.height, this.state.width) }px`,
      margin: '0',
      filter: 'blur(10px)',
      transform: 'scale(1.2)'
    }

    return (
      <figure style={ this.state.inlineStyle ? this.state.inlineStyle : inlineStyle }>
        <img style={ this.state.inlineStyle ? this.state.inlineStyle : inlineStylePlaceholder } src={ this.props.placeholder ? this.props.placeholder : this.state.source } alt=""/>
      </figure>
    )
  }

  renderRealImage() : void {
    const self = this
    let img = new Image
    const node: any = ReactDOM.findDOMNode(this)
    img.src = this.props.src
    img.onload = function() {
      self.setState({
        isLoading: false,
        inlineStyle: {
          width: '100%',
          backgroundColor: 'transparent',
          height:'auto',
          overflow: 'hidden',
          margin: '0',
          filter: 'blur(0)',
          transform: 'scale(1)',
          transition: 'all .6s'
        }
      })

      node.querySelector('img').src = self.props.src
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
