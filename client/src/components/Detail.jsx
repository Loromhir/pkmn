import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getDetail, cleanFilter} from '../redux/actions/index'
import '../styles/detail.css'

const Detail = (props) => {
  const dispatch = useDispatch();
  const myCharacter = useSelector((state)=> state.detail)
  
  useEffect(()=>{
    dispatch(getDetail(props.match.params.id))
    return ()=>{
        dispatch(cleanFilter())
    }
  }, [dispatch])
  
    return (
    <div className='background-detail'>
        <div className='container'>
        <div className='card-detail'>
            {
                myCharacter.length > 0 ?
                <div>
                    <h1 className='name-detail'>{myCharacter[0].name}</h1>
                    <ing src={myCharacter[0].img ? myCharacter[0].img : myCharacter[0].image} alt='image not submited' width='110px' height='150px' />
                    <h2>Health Points : {myCharacter[0].hp}</h2>
                    <p>Attack: {myCharacter[0].attack}</p>
                    <p>Defense: {myCharacter[0].defense}</p>
                    <p>Speed: {myCharacter[0].speed}</p>
                    <p>Height: {myCharacter[0].height}</p>
                    <p>Weight: {myCharacter[0].weight}</p>
                    <p>Type: { myCharacter[0].types.map((e)=><p>{e.name}</p>)   }</p>

                </div> : <p>Loading...</p>
            }
            <div className='back'>
                <Link to='/home'>
                    <button className='btn-detail'>back</button>    
                </Link>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Detail