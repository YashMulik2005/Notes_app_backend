const express = require('express');
const app = express();
const cors =require('cors');

app.use(cors({
    origin: "*"
}))

app.use(express.json());
// app.use(express.urlencoded({
//     extended:false
// }));

app.get("/",(req,res)=>{
    res.send("hello Client");
})

app.post("/", async(req,res) =>{
    try{
    console.log(req.body);
    let {topic} = req.body;
    let date = new Date();
    const result = await fetch(`https://newsapi.org/v2/everything?q=${topic}&from=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-3}&to=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate() }&sortBy=popularity&apiKey=70c8447e46874793860fbfa10dfbb5f6`);
   
    const response = await result.json();
    const arr = response.articles;
    if(arr.length === 0){
        return res.status(200).json({
        data:{error: "Cannot find"}
    })}

    res.status(200).json({
        data:arr.slice(0, 18)
    })
}
catch(e){
    console.log(e);
    res.status(400).send({error : "error"});
}
})

app.listen(3000, ()=>{
    console.log("serevr start at 3000 port");
})