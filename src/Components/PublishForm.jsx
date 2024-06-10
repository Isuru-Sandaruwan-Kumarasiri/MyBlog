import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../imgs/logo.png'

function PublishForm() {
  return (
    <nav className='navbar'>
        <Link to='/'>
            <img src={logo} alt="" />
        </Link>
    </nav>
  )
}

export default PublishForm