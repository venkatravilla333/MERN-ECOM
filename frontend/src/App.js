import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './components/Home'
import { Toaster } from 'react-hot-toast';

import './app.css'
import ProductDetails from './components/product/ProductDetails';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

let App = () => {
  return (
    <div className='app'>
      <Router>
       <Toaster position='top center'/>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/product/:id' element={<ProductDetails/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
        <Footer/>
      </Router>

    </div>
  )
}

export default App