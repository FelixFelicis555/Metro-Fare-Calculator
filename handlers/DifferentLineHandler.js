const FareHandler=require('./FareHandler');
const fareConfig = require('../config/fareConfig');

class DifferentLineHandler extends FareHandler{
    handle(request){
       // console.log('Handling request in DifferentLineHandler :')
        const {fromLine,toLine,isPeak}=request;
        const key=`${fromLine}-${toLine}`;
        const fareDetails=fareConfig.differentLine[key];
        if(fareDetails){
            return isPeak ? fareDetails.peak:fareDetails.nonPeak;
        }

        // Pass to next handler if no match
        return super.handle(request);
    }
}

module.exports=DifferentLineHandler;