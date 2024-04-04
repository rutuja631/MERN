const express = require('express');
require('./db/config');
const cors= require('cors');
const User = require('./db/User');
const Product=require('./db/Product');

const Jwt= require("jsonwebtoken");
const jwtkey= "e-comm";

const app = express();
app.use(express.json())
app.use(cors());

app.post("/signup", async (req,res)=>{
    let user= new User(req.body);
    let result= await user.save();
    result =result.toObject();
    delete result.password;
    Jwt.sign({result}, jwtkey, {expiresIn:"2h"},(err,token)=>{
        if(err){
            res.send({result:"Something went wrong, please try again"})
        }
        res.send({result, auth:token})
    })    
})

app.post("/login", async (req,res)=>{
    if(req.body.email && req.body.password){
        console.log(req.body);
        let user =await User.findOne(req.body).select('-password');
        if(user){
            Jwt.sign({user}, jwtkey, {expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send({result:"Something went wrong, please try again"})
                }
                res.send({user, auth:token})
            })         
        }else{
            res.send({result:'No user Found'})
        }
    }else{
        res.send({result:'Enter correct mail/password'})
    }
   
})

app.post("/add-product", async (req,res)=>{
    let product= new Product(req.body);
    let result= await product.save();
    res.send(result);
})

app.get("/products", async (req,res)=>{
    let products = await Product.find();
    if(products.length>0){
        res.send(products)
    }else{
        res.send({result:"No product found"})
    }
})

app.delete("/product/:id", async (req,res)=>{
    const result = await Product.deleteOne({_id:req.params.id});
    res.send(result);
})

app.get("/product/:id", async (req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result)
    }else{
        res.send({result:"No record found"})
    }});

app.put("/product/:id", async (req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        })
    res.send(result);
})

app.get("/search/:key", async (req,res)=>{
    let result = await Product.find({
        "$or":[
            {name: {$regex:req.params.key}},
            {company: {$regex:req.params.key}},
            {category: {$regex:req.params.key}},
        ]
    })
    res.send(result);
})
app.listen(5000);