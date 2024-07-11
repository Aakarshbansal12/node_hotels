const express=require('express');
const router=express.Router();
const MenuItem = require('./../models/MenuItem');

// Menu database
router.post('/', async (req, res) => {
    try {
      const data = req.body; // Request body contains the person data
  
      const Menu = new MenuItem(data);
  
      const response = await Menu.save();
      console.log('data saved for menu');
      res.status(200).json(response);
    }
    catch {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  // Fetching data from databsae of Menu

router.get('/', async (req, res) => {
    try {
      const data = await MenuItem.find();
      console.log('Data fetched from menu');
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  router.get('/:taste',async(req,res)=>{
    try{
      const taste=req.params.taste;
      if(taste=='sweet' || taste=='spicy' || taste=='sour'){
        const response=await MenuItem.find({taste:taste});
        console.log('Response fetched from menu type');
        res.status(200).json(response);
      }
      else{
        res.status(404).json({ errr: 'Invalid work ;type' });
      }
    }catch(err){
      console.log(err);
      res.status(500).json({err:'Internal server error'});
    }
  })

  //Update data in database
  router.put('/:id',async(req,res)=>{
    try{
        const itemId=req.params.id;//Extract the id from the URL parameter
        const updatedItemData=req.body;//Updated data for the person

        const response=await MenuItem.findByIdAndUpdate(itemId,updatedItemData,{
            new:true,// Return the updated document
            runValidators:true// Run moongose validation
        })

        if(!response){
            return res.status(404).json({error:'Item not found'});
        }

        console.log('Data updated in Menu');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

// Delete data from database
router.delete('/:id',async(req,res)=>{
  try{
      const itemId=req.params.id;

      const response=await MenuItem.findByIdAndDelete(itemId);
      if(!response){
          return res.status(404).json({error:'Item not Found'});
      }
      console.log('Data Delete from menu');
      res.status(200).json(response);
  }catch(err){
      console.log(err);
      res.status(404).json({error:'Internal server error'});
  }
})

  module.exports=router;