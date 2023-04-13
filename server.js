require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const { MONGO_CONECTION, PORT = 3000 } = process.env;

mongoose
  .connect(MONGO_CONECTION)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => console.log(`Server running. Use our API on port: ${PORT}`));
  })

  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
