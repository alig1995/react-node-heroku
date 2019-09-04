const express = require('express')
const cors = require('cors')
const axios = require('axios')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

//app ursl
const users = require('./routes/api/users')
const profiles  = require('./routes/api/profiles')
const posts = require('./routes/api/posts')

const app = express()

app.use(cors())

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Config db
const db = require('./config/keys').mongoAtlasURI


//connect to mogno
mongoose
  .connect(db,{ useNewUrlParser: true })
  .then((result) => {
    console.log('Db connected');
  }).catch((err) => {
    console.log(err);
  });

// app.get('/',(req,res)=>{
//  res.send('hello workd')
// })
// api routes
app.use('/api/users', users);
app.use('/api/profile', profiles);
app.use('/api/posts', posts);
const PORT = 5000 || process.env.PORT
app.listen(PORT,()=>console.log(`Listening on PORT ${PORT} `))