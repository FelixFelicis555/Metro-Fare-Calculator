const fs=require('fs');
const csvParser=require('csv-parser');

class CSVParser {
    static async parse(filePath){
        return new Promise((resolve,reject)=>{
            const results=[];
            fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data',(data)=>results.push(data))
            .on('end',()=>resolve(results))
            .on('error',(error)=>reject(error));
        });
    }
}

module.exports=CSVParser;