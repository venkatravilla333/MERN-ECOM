

import reactdom from 'react-dom'
import App from './App'



let parent = reactdom.createRoot(document.getElementById('root'))

parent.render(App())


