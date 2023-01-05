const initialState = {
    characters : [],
    charactersFilter: [],
    types: [],
    detail: []
}

function rootReducer( state= initialState, action){
    switch(action.type){
        case 'GET_CHARACTERS':
            return {
                ...state,
                characters : action.payload,
                charactersFilter :action.payload
            }
        case 'GET_NAME_CHARACTERS':
            return {
                ...state,
                charactersFilter: action.payload
            }
        case 'FILTER_BY_TYPES' : 
        const allCharacters = state.characters
        const filterAllCharacters = action.payload === 'Types' ? allCharacters : allCharacters.filter(e=> e.types.map((e)=>e.name).includes(action.payload))
        return {
            ...state,
            charactersFilter: filterAllCharacters
        }
        case 'FILTER_CREATED':
            var filterCreatedDB;
            if(action.payload === 'all'){
                filterCreatedDB = state.characters
            } else if(action.payload === 'api'){
                filterCreatedDB = state.characters.filter(pkmn=> !pkmn.createInDB)
            } else if(action.payload === 'db'){
                filterCreatedDB = state.characters.filter(pkmn=> pkmn.createInDB)
            }
            return {
                ...state,
                charactersFilter : filterCreatedDB
            }
        case 'POST_CHARACTER':
            return{
                ...state
            }
        case 'GET_TYPES':
            return {
                ...state,
                types: action.payload
            }
        case 'ORDER_BY_NAME':
            let one = [...state.charactersFilter]
            action.payload === 'asc' ? one.sort(function(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1
                }
                if(a.name.toLowerCase() < b.name.toLowerCase()){
                    return -1
                }
                return 0
            }):
            one.sort(function(a,b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1
                }
                if(a.name.toLowerCase() < b.name.toLowerCase()){
                    return 1
                }
                return 0
            })
            return {
                ...state,
                charactersFilter : one
            }
        case 'ORDER_BY_ATTACK':
            let sortedArray = action.payload === 'attackMin' ? 
            state.charactersFilter.sort(function(a,b){
                if (a.attack > b.attack){
                    return 1;
                }
                if (a.attack < b.attack){
                    return -1; 
                }
                return 0
            }) : 
            state.charactersFilter.sort(function(a,b){
                if (a.attack > b.attack){
                    return -1
                }
                if (a.attack < b.attack){
                    return 1
                }
                return 0
            })
            return{
                ...state,
                charactersFilter : sortedArray
            }
        case 'GET_DETAILS' : 
        return {
            ...state,
            detail : action.payload
        }
        case 'CLEAN_FILTER' :
            return {
                ...state,
                charactersFilter : action.payload,
                detail : action.payload
            }
        
        default : return state
    }   
}

export default rootReducer