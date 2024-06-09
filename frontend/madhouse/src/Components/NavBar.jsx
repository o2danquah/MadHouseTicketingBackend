import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'


function NavBar ()  {
 
    return (
<div>
        <header id="header" className="header d-flex align-items-center fixed-top">
  <div className="container-fluid d-flex align-items-center justify-content-between p-0">
    <a href="index.html" className="logo d-flex align-items-center">
      {/* Uncomment the line below if you also wish to use an image logo */}
       <img src="/bulldog.svg" alt />

      <h1>MADHOUSE</h1>
    </a>
    
    <div className="header-social-links d-flex">
      <a href="https://wa.me/0551874252" className="phone"><i className="bi bi-phone" /></a>
      <a href="0557290175" className="instagram"><i className="bi bi-whatsapp" /></a>
     
    </div>
    {/* <i className="mobile-nav-toggle mobile-nav-show bi bi-list" />
    <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x" /> */}
  </div>
</header>

      </div>
    )
  }


export default NavBar