const fs=require("fs");
const csv=require("csv-parser");

// Simple File without any Design Pattern Implements the Fare-Calculation-Logic
const FARE_RULES = {
    "Green-Green": { peak: 2, nonPeak: 1, dailyCap: 8, weeklyCap: 55 },
    "Red-Red": { peak: 3, nonPeak: 2, dailyCap: 12, weeklyCap: 70 },
    "Green-Red": { peak: 4, nonPeak: 3, dailyCap: 15, weeklyCap: 90 },
    "Red-Green": { peak: 3, nonPeak: 2, dailyCap: 15, weeklyCap: 90 },
};

const peakHours={
   "Monday": [
        { startHour: 8, startMinute: 0, endHour: 10, endMinute: 0 },
        { startHour: 16, startMinute: 30, endHour: 19, endMinute: 0 },
    ],
    "Tuesday": [
        { startHour: 8, startMinute: 0, endHour: 10, endMinute: 0 },
        { startHour: 16, startMinute: 30, endHour: 19, endMinute: 0},
    ],
    "Wednesday": [
        { startHour: 8, startMinute: 0, endHour: 10, endMinute: 0 },
        { startHour: 16, startMinute: 30, endHour: 19, endMinute: 0 },
    ],
    "Thursday": [
        { startHour: 8, startMinute: 0, endHour: 10, endMinute: 0 },
        { startHour: 16, startMinute: 30, endHour: 19, endMinute: 0 },
    ],
    "Friday": [
        { startHour: 8, startMinute: 0, endHour: 10, endMinute: 0 },
        { startHour: 16, startMinute: 30, endHour: 19, endMinute: 0 },
    ],
    "Saturday": [
        { startHour: 10, startMinute: 0, endHour: 14, endMinute: 0 },
        { startHour: 18, startMinute: 0, endHour: 23, endMinute: 0 },
    ],
    "Sunday": [
        { startHour: 18, startMinute: 0, endHour: 23, endMinute: 0 },
    ],
};

const is_peak_hour=(journeyTime)=>{
    const day=journeyTime.toLocaleDateString("en-US",{weekday:"long"});
    const hours=journeyTime.getHours();
    const minutes=journeyTime.getMinutes();

    

    const ranges=peakHours[day] || [];

    return ranges.some(({startHour,startMinute,endHour,endMinute})=>(
        (hours>startHour || (hours ===startHour &&minutes>=startMinute )) &&
        (hours<endHour || (hours===endHour && minutes<=endMinute))
    ));
};

const calculate_fare=(from_line,to_line,journeyTime)=>{
    const routeKey=`${from_line}-${to_line}`;
    const fareInfo=FARE_RULES[routeKey];

    if(!fareInfo){
        throw new Error(`Invalid route: ${routeKey}`);
    }
    return is_peak_hour(journeyTime) ?fareInfo.peak : fareInfo.nonPeak;
};



const calculate_total_fare=async (filePath)=>{
   let totalFare=0;
   const dailyFares={};
   const weeklyFares={};
   const rows=[];
   const parser=fs.createReadStream(filePath).pipe(csv());
   for await (const row of parser){
     rows.push(row);
   }

   for  (const row of rows){
    try {
        const {from_line,to_line,datetime}=row;
        console.log(from_line)
        const journeyTime=new Date(datetime);
        const journeyDate=journeyTime.toISOString().split("T")[0];
        const journeyWeek=journeyTime.getWeek();

        const baseFare=calculate_fare(from_line,to_line,journeyTime);
        console.log(baseFare);
        const routeKey=`${from_line}-${to_line}`;
        const fareInfo=FARE_RULES[routeKey];

        const dailyKey=`${journeyDate}-${from_line}-${to_line}`;
        const weeklyKey=`${journeyWeek}-${from_line}-${to_line}`;

        dailyFares[dailyKey]=(dailyFares[dailyKey] || 0);
        weeklyFares[weeklyKey]=(weeklyFares[weeklyKey] || 0);
        
        let cappedFare=baseFare;
        let dailyTotal=dailyFares[dailyKey];
        let weeklyTotal=weeklyFares[weeklyKey];
        if(dailyTotal+baseFare>fareInfo.dailyCap){
            cappedFare=Math.max(0,fareInfo.dailyCap-dailyTotal);
        } else{
            
            dailyFares[dailyKey]+=cappedFare;
        }
        if(weeklyTotal + baseFare> fareInfo.weeklyCap){
            cappedFare=Math.max(0,fareInfo.weeklyCap-weeklyTotal);
        } else {
            weeklyFares[weeklyKey]+=cappedFare;
            
        }
        
      
       totalFare+=cappedFare;
    } catch(error){
        console.error(`Invalid data in row:${JSON.stringify(row)}`);
    }

   }
   return totalFare;

};


Date.prototype.getWeek=function(){
    const date=new Date(this.getTime());
    date.setHours(0,0,0,0);
    date.setDate(date.getDate()+4-(date.getDay() || 7));
    const yearStart=new Date(date.getFullYear(),0,1);
    return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);

};

(async ()=>{
    const filePath="journeys.csv";
    const total_fare=await calculate_total_fare(filePath);
    console.log(`Total fare applied across all journeys: ${total_fare}`);


})();





