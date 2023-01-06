import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getCharacters, getTypes} from '../redux/actions/index.js';
import Card from './Card.jsx';
import NavBar from './NavBar.jsx';
import Paginated from './Paginated.jsx';
import '../styles/home.css'

const Home = () => {

  const dispatch = useDispatch();
  const charactersFilter= useSelector((state)=> state.charactersFilter);
  const [order,setOrder]= useState('');
  const [currentPage, setCurrentPage]= useState(1);
  const [charactersPerPage, setCharactersPerPage]= useState(12);
  const indexOfLastCharacter= currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = charactersFilter.slice(indexOfFirstCharacter, indexOfLastCharacter);

  const paginated = (pageNumber)=>{
    setCurrentPage(pageNumber);
  };

  useEffect(()=>{
    dispatch(getTypes());
    dispatch(getCharacters());
  },[dispatch]);


  return (
    <div className='container'>
      <NavBar setCurrentPage={setCurrentPage} setOrder={setOrder}/>
      <div className='filter'>
        <div className='tittle'>
          <Link to= '/character'><button className='btn-create'>CREATE</button></Link>
          <h1 className='tittle-home'>Pokemon</h1>
          <div className='main'></div>
          <Paginated charactersPerPage={charactersPerPage} 
                      characterFilter={charactersFilter.length}
                      paginated={paginated} currentPage={currentPage}/>
          <div className='div-cards'>
            {currentCharacters?.map((e)=>{
              return(
                <div>
                  <Link to={'/pokemon/'+ e.id}>
                    <Card key={e.id} name={e.name} image={e.image ? e.image : e.anotherImage} types={e.types} types2={e.Types} />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
        {charactersFilter.length === 0 && <p>Loading...</p>}
      </div>
    </div>
  )
}

export default Home