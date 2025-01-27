const SameLineHandler=require('./handlers/SameLineHandler')
const DifferentLineHandler=require('./handlers/DifferentLineHandler');
const FareCapHandler=require('./handlers/FareCapHandler');
const fareConfig=require('./config/fareConfig');

class FareCalculator {
    constructor(){
        this.chain=new SameLineHandler();
        
        this.chain.setNext(new DifferentLineHandler()).setNext(new FareCapHandler());
        /*
        const sameLineHandler=this.chain;
        sameLineHandler.setNext(new DifferentLineHandler());
        const differentLineHandler=new DifferentLineHandler();
        
        differentLineHandler.setNext(new FareCapHandler());
        */
    }
    isPeakHour(journeyTime){
       
        const day=journeyTime.toLocaleDateString("en-US",{weekday:"long"});
        const hours=journeyTime.getHours();
        const minutes=journeyTime.getMinutes();
        const ranges=fareConfig.peakHours[day] || [];
    
        // Check is the time falls within any peak range of a given day
       return ranges.some(({startHour,startMinute,endHour,endMinute})=>(
        (hours>startHour || (hours ===startHour &&minutes>=startMinute )) &&
        (hours<endHour || (hours===endHour && minutes<=endMinute))
    ));

    }
    calculateFare(fromLine,toLine,journeyTime){
        const isPeak=this.isPeakHour(journeyTime);
        const request={fromLine,toLine,journeyTime,isPeak};

        return this.chain.handle(request);
        
    }
}

module.exports=FareCalculator;