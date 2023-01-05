import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {postCharacter, getCharacters, cleanFilter,getTypes} from '../redux/actions/index';
import '../styles/characterCreate.css'


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


function validate(input){
    let errors= {}
    if(!input.name){
        errors.name = 'Fill in the name';
    } else if (input.types.length === 0 || input.types.length > 2){
        errors.types = 'Select one or two types'
    }
    return errors
}

function handleInputChange(e){
    setInput({
        ...input, 
        [e.target.name] : e.target.value
    })
    setError(validate({
        ...input,
        [e.target.name] : e.target.value
    }))
}

function handleSelect(e){
    if(!inputtypes.includes(e.target.value)){
        setInput({
            ...input,
            types : [...input.types, e.target.value]
        })
    }
}

function handleSubmit(e){
    e.preventDefault()
    dispatch(postCharacter(input))
    alert('Created!')
    setInput({
        name: '',
        types: [],
        image: '',
        life: 0,
        attack: 0,
        defense: 0,
        height: 0,
        weight: 0
    })
    history.push('/home')
}

function handleDelete(e){
    setInput({
        ...input,
        types: input.types.filter(t => t!== e.target.value)
    })
}
    return (
    <div className='container-chara'>
        <div className='detail-chara'>
        <div className='info-chara'>
            <Link to= 'home'><button className='btn-chara'>go back</button></Link>
            <h1 className='tittle-chara'>Make your own Pokemon</h1>
        <div className='card-create-chara'>
            <form>
                <div>
                <label>Name: </label>
                <input placeholder='required' type='text' value={input.name} name='name' onChange={handleInputChange}/>
                    {errors.name &&(
                        <p className='error'>{error.name}</p>
                    )}
                </div>
                <div>
                    <label>Image: </label>
                    <input type="text" value={input.image} name= 'image' onChange={handleInputChange} />
                </div>
                <div>
                    <label>Health Points:</label>
                    <input type="number" value={input.life} name='life' onChange={handleInputChange}/>
                </div>
                <div>
                    <label>Attack: </label>
                    <input type="number" name="attack" value={input.attack} onChange={handleInputChange} />
                </div>
                <div>
                    <label>Defense: </label> <input
                     type = "number" value = {input.defense}name = "defense" onChange={handleInputChange} />
                    </div>

                    <div>
                    <label>Height: </label> <input
                     type = "number" value = {input.height} name = "height" onChange={handleInputChange} />
                    </div>

                    <div>
                    <label>Weight: </label>
                    <input type = "number" value = {input.weight} name = "weight" onChange={handleInputChange} />
                    </div>

                    <div className='options-create-chara'>

                        <select onChange={handleSelect}>{type.map((e)=>(<option value={e.name}>{e.name}</option>))}</select>

                        <div>{input.types.map(e=> e, ',')}</div>
                        {input.types.map(e =>
                            <div>
                                <p>{e}</p>
                                <button value={e} className='btnx' onClick={(e)=>handleDelete(e)}>X</button>
                            </div>)}
                    </div>

                    <button onClick={handleSubmit} type='submit' disabled={Object.keys(error).length? true : false}>Create</button>
            </form>
        </div>
        </div>
        </div>
    </div>
  )
}

export default characterCreate