import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import{getNameCharacters} from '../redux/actions/index.js';

const SearchBar = () => {
    const dispatch= useDispatch();
    const [name, setName]= useState('');

    function hanldeInputChange(e){
        e.preventDefault();
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameCharacters(name))
    }
    return (
    <div>
        <input type='text' placeholder='Pokemon name' onChange={(e)=>handleInputChange(e)}>
            <button type ="submit" onClick={(e)=> handleSubmit(e)}>Search</button>
        </input>
    </div>
  )
}

export default SearchBar