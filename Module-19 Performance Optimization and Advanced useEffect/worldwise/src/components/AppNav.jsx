import React from 'react'
import styles from './AppNav.module.css'
import { NavLink } from 'react-router-dom'
function AppNav() {
  return (
    <nav className={styles.nav}>
        <ul>
            <li>
                <NavLink to="./cities">Cities</NavLink>
                {/* either use "./cities" ya "cities" both are fine */}
            </li>
            <li>
                <NavLink to="countries">
                    Countries
                </NavLink>
            </li>
        </ul>
    </nav>
  )
}

export default AppNav