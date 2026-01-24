
const express = require("express");
const app = express() 
const cors = require("cors")

//reconfigure with environment variables when we push to production
const corsOptions = {
    origin:["http://localhost:5173"]
}

app.use(cors(corsOptions))

app.get("/api",(req,res)=>{
    res.json({
        "test":"Hello there"
    })
});

app.listen(8080, ()=>{
    console.log("Server started on port 8080")
})