const express = require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
app.use(express.json());
app.use(cors())



const authurl = require("./router/Auth");
const adminurl = require("./router/admin");
const bookurl = require("./router/Book");

app.use("/api/Auth", authurl);
app.use("/api/admin", adminurl);
app.use("/api/books", bookurl);


if(mongoose.connect('mongodb+srv://vanithavinodh2431:jooshaathika2819@cluster0.3nym9.mongodb.net/LSM?retryWrites=true&w=majority&appName=Cluster0'))
{
    console.log('Database is connected');
}

app.listen(5000,()=>{
    console.log('server is connected.....');
})