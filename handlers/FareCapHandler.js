const FareHandler=require('./FareHandler');
const fareConfig=require('../config/fareConfig');

class FareCapHandler extends FareHandler {
    constructor(){
        super();
        this.dailyFares={}; // Tracks daily fares by date
        this.weeklyFares={}; // Tracks weekly fares by week
    }
    handle(request){
        //console.log('Handling request in FareCapHandler :');
        const {fromLine,toLine,journeyTime,fare}=request;
       
        const routeKey=`${fromLine}-${toLine}`;
        const dailyKey=`${this.getDailyKey(journeyTime)}:${routeKey}`;
        const weeklyKey=`${this.getWeekKey(journeyTime)}:${routeKey}`;

        // Get the fare caps for this route
        const {dailyCap,weeklyCap}=this.getCapValues(fromLine,toLine);

        const baseFare=fare
        
        this.dailyFares[dailyKey]=(this.dailyFares[dailyKey] || 0);
        this.weeklyFares[weeklyKey]=(this.weeklyFares[weeklyKey] || 0);
        let cappedFare=baseFare;
      
        if(this.dailyFares[dailyKey]+cappedFare>dailyCap){
            cappedFare=Math.max(0,dailyCap-this.dailyFares[dailyKey]);
        }
        else{
            this.dailyFares[dailyKey]+=cappedFare;
        }

        if(this.weeklyFares[weeklyKey]+cappedFare>weeklyCap){
            cappedFare=Math.max(0,weeklyCap-this.weeklyFares[weeklyKey]);
        }
        else{
            this.weeklyFares[weeklyKey]+=cappedFare;
        }
        return cappedFare;


    }
    getCapValues(fromLine,toLine){
        const routeKey=`${fromLine}-${toLine}`;
        const isSameLine = fromLine === toLine;
        const fareRules=isSameLine ? fareConfig.sameLine[fromLine] : fareConfig.differentLine[routeKey];
        const dailyCap=fareRules.dailyCap;
        const weeklyCap=fareRules.weeklyCap;
        return {dailyCap,weeklyCap};

    }
    getDailyKey(journeyTime){
        return journeyTime.toISOString().split("T")[0];
    }
    getWeekKey(date){
        const startOfYear=new Date(date.getFullYear(),0,1);
        const days=Math.floor((date-startOfYear)/(24*60*60*1000));
        const weekNumber=Math.ceil((days+startOfYear.getDay()+1)/7);
        return `${date.getFullYear()}-W${weekNumber.toString().padStart(2,'0')}`;


    }
}
module.exports=FareCapHandler;