import React from 'react'
import logo from '../../images/logo.png'
import Nav from './nav/Nav.jsx'
import { Link } from 'react-router-dom'
import style from './Header.module.css'

export default function Header(props) {

  
  return (
    <section className={style.header}>
      <section className={style.heder__container}>
        <section className={style.header__flex}>
          <Link to="/"><img src={logo} alt="LOGO" width='35px' /></Link>
            <Nav changeUserName={props}/>
        </section>
      </section>
    </section>
    )
}
