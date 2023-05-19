const dotenv = require('dotenv');

dotenv.config({ path: './config.env' }); //will read all variables from the file and save them into Node js
const app = require('./app');

// console.log(process.env);//=> development
//4.)Start Server;
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
