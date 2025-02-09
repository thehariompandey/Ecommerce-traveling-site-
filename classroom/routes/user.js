const express = require("express");
const router = express.Router();


//  index - user 
// index route 
router.get("/", (req,res) =>{
    res.send("GET for users")
});

// show route 
router.get("/:id", (req,res) =>{
    res.send("GET for users id")
});

// POST - user 
router.post("/", (req,res) =>{
    res.send("POST for users")
});
// delete route 
router.delete("/:id", (req,res) =>{
    res.send("GET for users id")
});

module.exports = router;