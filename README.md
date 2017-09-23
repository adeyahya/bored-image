# Bored Image
Lazy Loading image with placeholder in React.js

![](demo.gif)

### [DEMO](https://bored-image.now.sh/)

## Usage
`npm install bored-image --save`

```javascript
import BoredImage from 'bored-image'

function App() {
  return (
    <div>
      <BoredImage
        src={ /* source */ }
        placeholder={ /* placeholder */ }
        width={ /* naturalWidth */ }
        height={ /* naturalHiehgt */ }
        alt={ /* alt */ }/>
    </div>
  )
}
```
