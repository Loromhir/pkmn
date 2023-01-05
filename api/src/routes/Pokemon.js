const {Pokemon, Types} = require('../db.js');
const Router = require('express');
const router = Router();
const apiDBpkmn = require('../controllers/getPkmn.js');

router.get('/', async (req, res)=>{
    const pkmn = await apiDBpkmn();
    const name = req.query.name;

    if(name){
        const pkmnName = pkmn.filter(pkmn=> pkmn.name.toLowerCase() === name.toLowerCase())
        if(pkmnName){
            res.status(200).send(pkmnName)
        }else {res.status(200).send(pkmn)}
    }
})

router.get('/:id', async (req, res)=>{
    try{
        const pkmn = await apiDBpkmn();
        const id = req.params;
        if(id){
            const pkmnId = pkmn.filter(pkmn => pkmn.id == id)
            if(pkmnId){
                res.status(200).send(pkmnId)
            }
        }
    }catch(err){
        console.log(err)
    }
})

router.post('/', async (req, res)=>{
    const {name, hp, speed, attack, defense, height, weight, image, types} = req.body;
    try {
        const newPkmn = await Pokemon.create({name, hp, speed, attack, defense, height, weight, image, createInDB: true})
        console.log(newPkmn);
        const typeDb = await Types.findAll({ where : {name : types}})
        console.log(newPkmn);
        newPkmn.addTypes(typeDb)
        res.status(200).send('your pokemon has been created');
    } catch (error) {
        console.log(error)
        res.status(400).send("Something went wrong")
    }
})

module.exports = router