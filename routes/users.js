const express = require('express')
const router  = express.Router()

router.get("/",(req,res)=>{
    console.log("hellooo")
    res.send("User List")
})
router.get("/new",(req,res)=>{
    res.send("User New Form")
})   
router.get("/:id",(req,res)=>{
    res.send(`Get User With ID ${req.params.id}`)
})

module.exports = router         