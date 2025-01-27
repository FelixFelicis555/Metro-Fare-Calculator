const FareHandler=require('./FareHandler');
const fareConfig = require('../config/fareConfig');


class SameLineHandler extends FareHandler{
  handle(request){
   // console.log('Handling Request in SameLineHandler :');
    const {fromLine,toLine,isPeak}=request;
    if(fromLine === toLine){
        const fareDetails=fareConfig.sameLine[fromLine];
        if(fareDetails){
            return isPeak? fareDetails.peak : fareDetails.nonPeak;
        }
    }
   // Pass the request to the next handler in the chain
    console.log('Not a match ,passing to the next handler.');
   
   return super.handle(request);
  
  }
  
}
module.exports=SameLineHandler;