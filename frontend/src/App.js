import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import { Toaster } from 'react-hot-toast';

import './app.css'

let App = () => {
  return (
    <div className='app'>
      <Router>
       <Toaster position='top center'/>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
        </Routes>
        <Footer/>
      </Router>

    </div>
  )
}

export default App