const mongoose = require ('mongoose')
const schema = mongoose.Schema({
    desciption:{
        type:String
    },
    classifier:{
        type:String
    },
    openingBalance:{
        type:Number
    },
    debit:{
        type:Number
    },
    credit:{
        type:Number
    },
    finalBalance:{
        type:Number
    },
    parent:{
        type:String
    },
    
})

const model=mongoose.model('Object',schema);
module.exports=model;
