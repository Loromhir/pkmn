import axios from 'axios'

export const actionTypes = {
    ORDER_BY_NAME : 'ORDER_BY_NAME'
}

export function getCharacters(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/pokemon');
        await dispatch({
            type :'GET_CHARACTERS',
            payload : json.data
        })
    }
}

export function filterCharactersByTypes(payload){
    return {
        type : 'FILTER_BY_TYPES',
        payload
    }
}

export function filterCreated(payload){
    return {
        type : 'FILTER_CREATED',
        payload
    }
}

export function orderByDefault(payload){
    return {
        type : 'ORDER_BY_DEFAULT',
        payload
    }
}

export function orderByName(payload){
    return{
        typr: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByAttack(payload){
    return {
        type: 'ORDER_BY ATTACK',
        payload
    }
}

export function getNameCharacters(name){
    return async function(dispatch){
        try{
                var json= await axios.get(`http://localhost:3001/pokemon?name=${name}`)
                return dispatch({
                    type : 'GET_NAME_CHARACTERS',
                    payload : json.data
                })
        } catch(error){
            console.log(error)
        }
    }
}

export function getTypes(){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/types')
        return dispatch({type : 'GET_TYPES', payload : json.data})
    }
}

export function postCharacter(payload){
    return async function (dispatch){
        const res = await axios.post('http://localhost:3001/pokemon', payload)
        return res;
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            var json = await axios.get(`http://localhost:3001/pokemon/${id}`)
            return dispatch({
                type : 'GET_DETAILS',
                payload : json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function cleanFilter(){
    return{
        type : 'CLEAN_FILTER',
        payload : []
    }
}