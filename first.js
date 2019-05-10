
const fs=require('fs')
const sscanf = require('sscanf')
class Level1{
    constructor(fileName){
        this.fileName=fileName;
    };
    getParent(classifier){
        const nonNullSide=classifier.split(0)[0];
        if(nonNullSide.length==1)return(null)
        let result=nonNullSide.slice(0,nonNullSide.length-1)
        while(result.length!=classifier.length){
            result+="0"
        }
        return(result)
    
    }
    
    refactorFileIntoObjects(){
        let collection=[];
        const lines=fs.readFileSync(this.fileName, 'utf-8').split('\n').filter(Boolean);
        lines.forEach(line => {

            line = line.replace(/(\w+)\s(\w+)/g,"$1_$2")


            let [classifier,desciption,openingBalance,debit,credit,finalBalance]=sscanf(line,"%s  %s %d  %d  %d  %d");
            let parent=this.getParent(classifier)
            desciption=desciption.replace(/_/g," ")
            let obj={
                desciption,
                classifier,
                openingBalance,
                debit,
                credit,
                finalBalance,
                parent
            }
            collection.push(obj);
        });
        return collection;
    }
}

let instance=new Level1('input1')
console.log(instance.refactorFileIntoObjects());


