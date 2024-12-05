
import reactdom from 'react-dom'
import App from './App'


var root = document.getElementById('root')

var parent = reactdom.createRoot(root)

parent.render(<App/>)


