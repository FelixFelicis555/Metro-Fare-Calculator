// Base Fare-Handler Class

class FareHandler {
    constructor(){
        this.nextHandler=null;
    }
    setNext(handler){
        this.nextHandler=handler;
        return handler;
    }

    handle(request){
        if(this.nextHandler){
            return this.nextHandler.handle(request);
        }
        throw new Error('No handler found for this request!');
    }
}

module.exports=FareHandler;