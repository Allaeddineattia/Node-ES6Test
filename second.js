
const fs=require('fs')
const sscanf = require('sscanf')
class Level2{
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

    refactorFileIntoObjects(){
        let collection=[];
        let lines=fs.readFileSync(this.fileName, 'utf-8').split('\n').filter(Boolean);
        lines=lines.filter(line=>{
            return line.replace(/\s+/,"").length>0
        });
        lines.forEach(line=>{
            //console.log(line)
            let line2 = line.replace(/(\w+)\s(\w+)+/g,"$1_$2")
            let line1=line
            while(line2!=line1){
                line1=line2
                line2 = line2.replace(/(\w+)\s(\w+)+/g,"$1_$2")
                line2 = line2.replace(/(\w+)\s(\d+)+/g,"$1_$2")
                line2 = line2.replace(/(\w+:)\s(\d+)+/g,"$1_$2")
            }
            let [classifier,desciption,openingBalance,debit,credit,finalBalance]=sscanf(line2,"%s  %s %s  %s  %s  %s");
            desciption=desciption.replace(/_/g," ")
            classifier=classifier.replace(/\./g,'')
            openingBalance=this.refactorBrazilianMandatory(openingBalance)
            debit= this.refactorBrazilianMandatory(debit)
            credit= this.refactorBrazilianMandatory(credit)
            finalBalance= this.refactorBrazilianMandatory(finalBalance)
            let parent=this.getParent(classifier)
            let obj={
                desciption,
                classifier,
                openingBalance,
                debit,
                credit,
                finalBalance,
                parent
            }
            collection.push(obj)

        })
        //console.log(lines2)
        return collection;
    }
}


let instance=new Level2('input2')

console.log( instance.refactorFileIntoObjects())
