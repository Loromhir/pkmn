const { conn } = require('./src/db.js');
const server = require('./src/App') 

//se sincronizan todos los modelos en uno 
conn.sync({ force: true }).then(() => {
    server.listen(3001, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  });