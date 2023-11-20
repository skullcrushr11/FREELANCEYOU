const express=require("express");
const app=express();
const mongoose=require("mongoose");
const upload=require("express-fileupload");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}))
app.use(upload());
mongoose.connect("mongodb+srv://dbs_access_id:LAnufCYnEjRFLMgD@cluster0.xem0wkn.mongodb.net/usersDB",{useNewUrlParser:true},{useUnifiedTopology:true})

//data schema: 
const dbSchema={
    fullName:String,
    email:String,
    occupation:String,
    skills:Array,
    image:Buffer,
    description:String,
    languagesKnown:String,
    languageLevel:String

}

//creating the model:
const dbs=mongoose.model("dbs",dbSchema);


app.get("/",function(req,res){
    res.sendFile(__dirname+"/apply.html");
    
})

app.post('/',function(req,res){
    var file=req.files.profileImage;
        console.log(req.files.profileImage);
        var filename=file.name;
        file.mv("./uploaded_pics/"+filename,function(err){
            if(err){
                console.log("it aint happening");
            }
        })
    let skill=req.body.skills;
    skill=skill.split(",");
    let newUser=new dbs({
        fullName:req.body.fullName,
        email:req.body.email,
        occupation:req.body.occupation,
        skills:skill,
        image:req.files.profileImage.data,
        description:req.body.description,
        languagesKnown:req.body.languagesKnown,
        languageLevel:req.body.languageLevel
    });
    newUser.save();
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("server running lol");
})