import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from "./PageNav.module.css"
import Logo from './Logo'

function Navbar() {
  return (
    <nav className={styles.nav}>
        <Logo/>
        <ul>
            <li>
               <NavLink to="/">Home</NavLink> 
            </li>
            <li>
               <NavLink to="/pricing">Pricing</NavLink> 
            </li>
            <li>
               <NavLink to="/products">Products</NavLink> 
            </li>
            <li>
               <NavLink to="/login" className={styles.ctaLink}>Login</NavLink> 
            </li>
        </ul>
    </nav>
  )
}

export default Navbar