const express= require ("express");
const app=express();
const bodyParser=require("body-parser");
var MongoClient = require('mongodb').MongoClient;
const cors= require("cors");
app.use(
    cors({
        origin:"http://localhost:3000",
    }))
var url = "mongodb+srv://ayushplussoni:tenet2020@mongodb.jtquv.mongodb.net/Database";
app.use(bodyParser.urlencoded({extended:true}));
var Balance=-1;
var User=null;
var Password=null;

app.get("/",function(req,res){res.sendFile(__dirname+"/index.html")});

app.post("/signup",function(req,res){res.send("User Signed Up");
    var user={username:req.body.username,password:req.body.password,balance:999};
    MongoClient.connect(url, function (err, client) {
    var db = client.db('Database');
    if (err) throw err; 
    db.collection("records").insertOne(user, function(err, res) {
    if (err) throw err;
  });

    });
});

app.post("/login/:username/:password",function(req,res){
    
    MongoClient.connect(url, function (err, client) {
    var db = client.db('Database');
    const query={username:req.params.username, password:req.params.password}
    db.collection("records").findOne(query,(function(err, result) {
    if (err) throw err;
    res.json({name:result.name,password:result.password,username:result.username})
        }));
    });
});

app.post("/balance/:username",function(req,res)
{

    const x=req.params.username;
    MongoClient.connect(url, function (err, client) {
    var db = client.db('Database');
    const query={username:x}
    db.collection("records").findOne(query,(function(err, result) {
    if (err) throw err;
    res.json({balance:result.balance})
        }));
    });
    
});

app.post("/transaction/:sender/:receiver/:amount/:pin/:balance/:password",function(req,res)
{
    MongoClient.connect(url, function (err, client) 
    {
    var db = client.db('Database');
    const receiver=req.params.receiver;
    const sender=req.params.sender;
    const amount=req.params.amount;
    const pin=req.params.pin;
    var balance=req.params.balance;
    const password=req.params.password;
    const query={username:sender};
    



    if((pin==password&&receiver!=sender)&&(balance-amount>0))
        {
            db.collection("records").update(
            { username: receiver },
            { $inc: { balance: +amount, } })
            db.collection("records").update(
            { username: sender },
            { $inc: { balance: -amount, } })
            balance-=amount;
            res.send("Transaction Successful ! Paid "+amount+" to "+ receiver);

        }
        else
        {
            if(receiver==sender)res.send("You cannot transfer amount to self !");
            if(sender==null)res.send("Log-in to your account to perform transaction");
            if(pin!==password)res.send("Transaction Unsuccessful !- Incorrect PIN");
            if(balance-amount<=0)res.send("Transaction Unsuccessful !- Insufficient Balance");
        }
        });
});

app.listen(5000,function(){
    //console.log("server is running on 5000");
});

app.post("/test",(req,res)=>
{
    const x={username:"XYZ"};
    res.status(200).send(x);});