const mongoose=require('mongoose');

var bodyParser = require('body-parser');
const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
require('dotenv').config();

const PORT = process.env.PORT || 5000


  // DB Connection____________________________________________
const uri =  process.env.ATLAS_URI;
var options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    promiseLibrary: global.Promise
};
 mongoose.connect(uri, options);
  const connection =mongoose.connection;  
 
connection.once('connected', ()=>{
    console.log('MongoDB database connection established successfully');
})  

//__________________________________________________________________________

const visit_router   = require('./src/routers/visit.router')
const patient_router = require('./src/routers/patient.router');
const servant_router = require('./src/routers/servant.router');
const hospital_router = require('./src/routers/hospital.router');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .engine('html', require('ejs').renderFile)
  .set('view engine', 'html')
  /* .set('view engine', 'ejs') */
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))

  .use(bodyParser.json())
  .use('/visits',visit_router)
  .use('/patients',patient_router)
  .use('/servants',servant_router)
  .use('/hospitals',hospital_router)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

  