const CSVParser=require('./utils/CSVParser');
const FareCalculator=require('./FareCalculator');

const csvFilePath='./data/journeys.csv';

const fareCalculator=new FareCalculator();

(async ()=>{
    try{
        const journeys=await CSVParser.parse(csvFilePath);
        let totalFare=0;
        journeys.forEach(({fromLine,toLine,datetime})=>{
            const journeyTime=new Date(datetime);
           // console.log(fromLine);
            const fare=fareCalculator.calculateFare(fromLine,toLine,journeyTime);
            console.log(`Fare for ${fromLine} -> ${toLine} on ${datetime}: $${fare}`);
            totalFare+=fare;
        });
        console.log(`Total fare applied: $${totalFare}`);
    } catch (error){
        console.error('Error processing CSV file:',error);
    }
})();
