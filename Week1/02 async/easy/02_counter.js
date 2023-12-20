// ## Counter without setInterval

function counter(i,maxvalue,interval){
    console.log(i);
    if(i<maxvalue){
        setTimeout(()=>{
            counter(i + 1, maxvalue, interval);
        },interval);
    }
}

counter(1,50,1000);