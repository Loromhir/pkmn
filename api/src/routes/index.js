const {Router} = require('express');
const router = Router();
const pokemonRouter = require('./Pokemon.js');
const typeRouter = require('./Types.js');

router.use('/pokemon', pokemonRouter)
router.use('/type', typeRouter)

module.exports = router