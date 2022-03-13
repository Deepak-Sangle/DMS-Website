// const text = file.readFileSync("main.txt", "utf-8");
// file.writeFileSync("new.txt", text.replace("Dawg", "Mister"));

const file = require("fs");

// const http = require('http');
const html = file.readFileSync('Home.html');
// const server = http.createServer(function(req,res){
//     res.writeHead(200, {'Content-Type':'text/html'})
//     res.write(html);
//     if(req.url=='/')
//         console.log(req.url);
//     else if(req.url=='/Pages.html')
//         console.log(req.url)
//     res.end();
// });
// server.listen(80);

// const self_module = require('./Home');
// console.log(self_module.fn([1,2,3,4,5,6]));

const express = require('express');
const app = express();

app.get('/',function(req,res){
    res.sendFile('Home.html', {root : __dirname});
    // res.write(html);
});
app.get('/Pages.html',function(req,res){
    res.send(`'Home.html', {root : __dirname}`);
    // res.write(html);
});
app.use((req,res)=>{
    res.status(404).send("404");

})
app.listen(80,()=>{
    console.log("App Listen");
});