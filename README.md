# Bored Image
Bored Image is a JavaScript module that can be used to replace `<img/>` element cause it integrated with lazy-load uisng IntersectionObserver and using color & blurry placeholder that has same dimension as original source. It will be usefull for user that has slow internet connection to reduce expand effect when the original source has resolved.

![](demo.gif)

### [DEMO](https://bored-image.ihavemind.com/)

## Installation
`npm install bored-image --save`

## Usage
```javascript
import BoredImage from 'bored-image'

function App() {
  return (
    <div>
      <BoredImage
        src={ /* source */ }
        placeholder={ /* placeholder */ }
        color={ /* color placeholder ex: #333 */ }
        width={ /* naturalWidth */ }
        height={ /* naturalHiehgt */ }
        alt={ /* alt */ }/>
    </div>
  )
}
```
