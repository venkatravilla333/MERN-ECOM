

import React from 'react'
import Sidebar from './Sidebar'

function Userlayout({children}) {
  return (
    <div className='row'>
      <div className='container col-6'>
      
           <Sidebar/>
      </div>
      <div className='col-6'>
        {children}
      </div>
    </div>
  )
}

export default Userlayout