const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const items = require('./routes/api/Items');
const path = require('path');

const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
.connect(db)
.then( ()=>{
    console.log('Mongodb connected');
})
.catch( (err)=>{
 console.log(err)
})

app.use('/api/items',items);

// serve static assest if in production

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) =>{
          res.sendFile(path.resolve(__dirname,'client','build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;

app.listen(port,() =>{ console.log(`Server Statrted on port ${port}`); })

