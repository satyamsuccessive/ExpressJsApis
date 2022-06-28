const express = require("express");
const routers = express.Router()
const path = require("path");
const Model = require('../model/model');
const { Author, validate } = require('../model/author');
const { router } = require("../server");


// const { route } = require("../routes/users");

// require("dotenv").config()


//modules

// const ADMIN_PARENT_ROUTE = require("./admin/routes/auth.routes");

//Testing server



routers.get('/', (req, res) => {
    res.status(200).send("Hello APIs route")
})


//Author's Registeration

routers.post('/register',async(req,res)=>{
    //First Validate the Request
    const {error} = validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    //Check if user is already exists
    let author = await Author.find({email:req.body.email});
    console.log(author);
    if(author.length>1){
        return res.status(400).send('Author already exists!');
    }
    else{
        //Insert the new user if they do not exists yet

        author  = new Author ({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password:req.body.password
        })
        await author.save()
        res.send(author)
    }
})

//Create Post

routers.post('/post', async(req, res) => {
    console.log(req.body)
    const data = new Model({
        posttitle: req.body.posttitle,
        postcontent: req.body.postcontent
    })
    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message:error.message})
    }
})

//Get All Post

routers.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    } 
    catch(error){
        res.status(500).json({message: error.message})
    }
})


//Post Delete by ID Method
routers.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Update Post by ID Method
routers.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})


//Get by ID Method
routers.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})





// routers.use('/admin', ADMIN_PARENT_ROUTE)


routers.all('*', (req, res) => {
    res.status(404).send("404....")
})


module.exports = routers