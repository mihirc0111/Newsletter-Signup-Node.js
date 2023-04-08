
//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request=require("request");
const https = require("https");
require("dotenv").config();
const app = express();
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public")); 
// app.use(express.static(__dirname));//use public while hosting or while using localhost:3000, __dirname is fine when you paste folder path address directly in browser 


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});



app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");

});

app.post("/", function (req, res) {

    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const email=req.body.email;
    const apiKey = process.env.apiKey;
    const listId = process.env.listId;

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName,
                }
            }
        ]  
    };
const jsonData=JSON.stringify(data);
//  const url="https://$API_SERVER.api.mailchimp.com/3.0/lists/d80d2975aa" ;
 const url="https://us21.api.mailchimp.com/3.0/lists/"+ listId ;

const options={
    method:"POST",
    auth:"mihir1:"+apiKey

}

const request=https.request(url,options,function(response){

if(response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
}else{
    res.sendFile(__dirname+"/failure.html");
}

response.on("data",function(data){
console.log(JSON.parse(data));
})


})
request.write(jsonData);
request.end();
});

// redirects to home page if failure page occurs
app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port "+ process.env.PORT);
});














