const express = require('express');
const Router = express.Router();

const Item = require('../../model/Item');

Router.get('/', (req,res,next)=>{

    Item.find()
    .sort({date : -1})
    .then(items => { res.json(items)})

});

Router.post('/',(req,res,next)=>{
   // console.log(req)
    var newItem = new Item({
        name : req.body.name
    });
    
    newItem.save()
    .then( item => res.json(item))
    .catch( err => { res.json(err);});

});

Router.delete('/:id',(req,res,next)=>{

  const id = req.params.id;   
  Item.findById(id)
  .then( item => {
      Item.remove().then( ()=> res.json({succes : true}) );
  })
  .catch( err => res.status(404).json({succes : false}) );
 
});



module.exports = Router;