import React from 'react'
import {Link} from 'react-router-dom';
import '../styles/notFound.css'

export const NotFound = () => {
  return (
    <div><h1>NotFound</h1>
    <Link to = '/home'><button className='homeNotFound'>HOME</button></Link></div>
  )
}
