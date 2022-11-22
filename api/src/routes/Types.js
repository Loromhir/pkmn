const {Types} = require('../db.js');
const {Router} = require('express');
const axios = require('axios');
const router = Router();

router.get('/', async ( req, res)=>{
    const url= await axios.get('https://pokeapi.co/api/v2/type');
    console.log(url.data)
    const nameType = await url.data.result.map(e=> e.name )
        for( const type of nameType){
            Types.findOrCreate({where: {name : type}})
        }
        const allTypes = await Types.findAll()
        try {
            res.status(200).send(allTypes)
        } catch (error) {
            console.log(error)
        }
});

module.exports = router;