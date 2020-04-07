const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
});

app.listen(port,(err)=>{
    if(err){
        console.log("Error");
    }else{
        console.log("Running application on port"+port);
    }
});