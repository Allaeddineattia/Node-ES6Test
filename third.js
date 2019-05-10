const fs=require('fs')
const sscanf = require('sscanf')
class Level3{
    constructor(fileName){
        this.fileName=fileName;
    };
    getParent(classifier){
        const nonNullSide=classifier.split(0)[0];
        if(nonNullSide.length==1)return(null)
        let result=nonNullSide.slice(0,nonNullSide.length-1)
        while(result.length<6){
            result+="0"
        }
        return(result)
    
    }
    
    refactorBrazilianMandatory(value){
        value=value.replace(/\./g,'')
        value=value.replace(/\,/g,'.')
        return(parseFloat(value))
    }

    checkLine(line){
        let valid = /^\s*[0-9].+$/;
        if(line.match(valid)) return true
        return false
    }

    reShapeLine(line){
        line=line.replace(/\sD\s/g,'')
        line=line.replace(/\sC\s/g,'')
        line=line.replace(/\*/g,'')
        let line2 = line.replace(/(\w+)\ (\w+)+/g,"$1_$2")
        let line1=line
        while(line2!=line1){
            line1=line2
            line2 = line2.replace(/([\wàéè]+)\ ([\wàéè]+)+/g,"$1_$2")
            line2 = line2.replace(/([\wàéè]+)\ (\d+)+/g,"$1_$2")
            line2 = line2.replace(/([\wàéè]+:)\ (\d+)+/g,"$1_$2")
            line2 = line2.replace(/([\wàéè]+)\s-\s([\wàéè]+)+/g,"$1_-_$2")
        }
        return line2
    }

    reShapeDescription(description){
        description=description.replace(/_/g," ")
        description=description.replace(/\t/g,"")
        return description
    }

    refactorFileIntoObjects(){
        let collection=[];
        let lines=fs.readFileSync(this.fileName, 'utf-8').split('\n').filter(Boolean);
        
        lines=lines.filter(line=>this.checkLine(line));
        lines.forEach(line=>{
            let [classifier,description,openingBalance,debit,credit,finalBalance]=sscanf(this.reShapeLine(line),"%s  %s %s  %s  %s  %s");
            description=this.reShapeDescription(description)
            classifier=classifier.replace(/\./g,'')
            openingBalance=this.refactorBrazilianMandatory(openingBalance)
            debit= this.refactorBrazilianMandatory(debit)
            credit= this.refactorBrazilianMandatory(credit)
            finalBalance= this.refactorBrazilianMandatory(finalBalance)
            let parent=this.getParent(classifier)
            let obj={
                description,
                classifier,
                openingBalance,
                debit,
                credit,
                finalBalance,
                parent
            }
            collection.push(obj)
        })
        return collection;
    }
}

let instance=new Level3('input3')
instance.refactorFileIntoObjects()
module.exports=Level3

