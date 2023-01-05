const {Router}= require('express');
const router = Router();
const {Pokemon, Type}= require('../db.js');
const axios = require('axios').default;

const pokeApi= async ()=>{
    try {
        const apiUrl = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40");
        const pokeURL = apiUrl.data.results.map(e=> axios.arguments(e.url))
        const pokeInfo = await axios.all(pokeURL)
        .then( pkmn => pkmn.map( p=>{
            const allPkmn={
                id: p.data.id,
                name: p.data.name,
                hp: p.data.stats[0].base_stat,
                attack: p.data.stats[1].base_stat,
                defense: p.data.stats[2].base_stat,
                speed: p.data.stats[5].base_stat,
                height: p.data.height,
                weight: p.data.weight,
                types: p.data.types.map(t=>t.type),
                image: p.data.sprites.other.home.front_default
            }
            return allPkmn
        }))
            return pokeInfo
    } catch (error) {
        console.log(error)
    }
}

const pkmnDB = async ()=>{
    try {
        const pokeDB = await Pokemon.findAll({
            include: {
                model: Types,
                attributes: ['name'],
                through : { attributes : []}
            }
        })
        return pokeDB
    } catch (error) {
        console.log(error)
    }
}

const dbApiPkmn = async ()=>{
    const apiPkmn = await pokeApi()
    const dbPkmn = await pkmnDB()
    const totalPkmn = apiPkmn.concat(dbPkmn)
    return totalPkmn
}

module.exports = dbApiPkmn