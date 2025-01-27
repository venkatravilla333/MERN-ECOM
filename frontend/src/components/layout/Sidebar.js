import React, { useState } from 'react'

import '../../app.css'

import {Link, useLocation} from 'react-router-dom'


let userMenu = [
  {
    name: "profile",
    url: '/user/profile'
  },
  {
    name: "update profile",
    url: '/user/updateprofile'
  },
  {
    name: "delete profile",
    url: '/user/deleteprofile'
  },
  {
    name: "update password",
    url: '/user/updatepassword'
  }
]

function Sidebar() {

  let location = useLocation()
  
  let [activemenuItem, setActivemenuItem] = useState(location.pathname)
  
  let handleMenuItemClick = (menuitemUrl) => {
     setActivemenuItem(menuitemUrl)
  }
  return (
    <div>

      <div className='row usermenu'>
        <h4>User settings</h4>
      
        {
          userMenu.map((menuitem) => {
            return <div>
              <Link to={menuitem.url} className={`userlinks ${activemenuItem.includes(menuitem?.url) ? "active" : ""}`} onClick={()=>handleMenuItemClick(menuitem?.url)}>{menuitem?.name}</Link>
           </div> 
          })
        }
       
      </div>
      
    </div>
  )
}

export default Sidebar