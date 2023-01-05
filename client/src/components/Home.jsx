import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getCharacters, getTypes} from '../redux/actions/index.js';
import Card from './Card.jsx';
import NavBar from './NavBar.jsx';
import Paginated from './Paginated.jsx';
import '../styles/home.css'

const Home = () => {
  return (
    <div>Home</div>
  )
}

export default Home