const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

//POST route to add the person
router.post('/', async (req, res) => {
    try {
        const data = req.body; // Request body contains the person data

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }

})

// Fetching the data from the database using get
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// Work type of Person
router.get('/:worktype', async (req, res) => {
    try {
        const worktype = req.params.worktype;
        if (worktype == 'chef' || worktype == 'manager' || worktype == 'waiter') {

            const response = await Person.find({ work: worktype });
            console.log('Response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ errr: 'Invalid work ;type' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//Update the data in database
router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;//Extract the id from the URL parameter
        const updatedPersonData=req.body;//Updated data for the person

        const response=await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,// Return the updated document
            runValidators:true// Run moongose validation
        })

        if(!response){
            return res.status(404).json({error:'Person not found'});
        }

        console.log('Data updated');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

// Delete the data from the database
router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;

        const response=await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'Person not Found'});
        }
        console.log('Data Delete');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(404).json({error:'Internal server error'});
    }
})

module.exports=router;