const express = require("express");
const router = express.Router();


// POST 
// index route 
router.get("/", (req,res) =>{
    res.send("GET for post")
});

// show route 
router.get("/:id", (req,res) =>{
    res.send("GET for post id")
});

// POST - user 
router.post("/", (req,res) =>{
    res.send("POST for post")
});
// delete route 
router.delete("/:id", (req,res) =>{
    res.send("GET for post id")
});


module.exports = router;