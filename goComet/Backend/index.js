const express = require('express')
const cors = require('cors')
const data = require("./data.json")
const app = express();
app.use(cors())
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
const port  = process.env.PORT || 8080;


app.get("/", (req, res)=>{
    res.send(data)

})
app.get("/getprod/:id",  (req, res)=>{
    console.log(req.params.query)
    let filterData = data.filter((ele)=>ele.id !== req.params.query)
    res.send(filterData)

})
app.listen(port, ()=>{
    console.log(`localhost:${port}`)
})
