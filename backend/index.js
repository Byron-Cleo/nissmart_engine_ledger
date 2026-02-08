const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const { sequelize } = require('./models');

const app = require('./app');

const PORT = process.env.PORT;
const ENV = process.env.NODE_ENV;  

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `Nissmart Application in ${ENV} Mode Running on ${PORT} with MySQL... ;)`
    );
  } catch (error) {
    console.log(error);  
  }
}); 
