require('dotenv').config();
const {Sequelize} = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASS, DB_HOST } = process.env;

const sequelize= new Sequelize(`postgre://${DB_USER}:${DB_PASS}@${DB_HOST}/pokemon`,{
    logging: false,
    native: false,
});

const basename= path.basename(__filename);

const modelDefiners = [];

// lee todos los archivos de la carpeta models, los requiere y agrega al arreglo modelDeginers
fs.readdirSync(path.join(__dirname, '/models'))
    .filter((file)=> (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3)=== '.js'))
    .forEach((file) => { modelDefiners.push(require(path.join(_dirname, '/models', file)));       
    });

// injecta la coneccion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));

// capitaliza los nombres de los modelos ie: pokemon => Pokemon}
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry)=>[entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models =Object.fromEntries(capsEntries);

//tiene los modelos importados como propiedades en sequelize.models
const {Pokemon, Type} = sequelize.models;

// las relaciones entre modelos
Pokemon.belongsToMany(Type, {through: 'Pokemon_Type'});
Type.belongsToMany(Pokemon, {through: 'Pokemon_Type'});

module.exports= {...sequelize.models,
                    conn: sequelize}