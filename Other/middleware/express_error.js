class ExpressError extends Error{
    constructor(Sstatus,message){
        super();
        this.status = status;
        this.meassage = message;
    }
}


module.exports = ExpressError;
