const model =require('./mongoModel')
const Level3 = require("./third")
let mongoose = require ('mongoose');
mongoose.connect("mongodb://localhost:27017/ES6Test",{useNewUrlParser:true});

const instance = new Level3('input3');
let Objects = instance.refactorFileIntoObjects();
Objects.forEach(async object=>{
    let objectToInsert=model(object)
    await objectToInsert.save()
})