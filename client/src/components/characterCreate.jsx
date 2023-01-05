import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {postCharacter, getCharacters, cleanFilter,getTypes} from '../redux/actions/index';
import '../styles/characterCreate.css'
import { ValidationError } from 'sequelize';

const characterCreate = () => {
  
    const dispatch = useDispatch();
    const history = useHistory();
    const types = useSelector((state)=> state.types)
    const [error, setError] = useState({});
    const characters = useSelector(state=> state.characters);

    const [input, setInput] = useState({
        name: '',
        types : [],
        image: '',
        life : 0,
        attack : 0,
        defense : 0,
        height: 0,
        weight : 0
    });

    useEffect(()=>{
        dispatch(getTypes());
        dispatch(getCharacters());
        if(validate(input)){
            setError(validate(input))
    } return ()=>{
        dispatch(cleanFilter())}
    }, [])
    return (
    <div>characterCreate</div>
  )
}

export default characterCreate