function double(arr){
    for(let i=0; i<arr.length; i++){
        arr[i] = arr[i]*2;
    }
    return arr;
}

let arr = [1,2,3,4]

const ans = arr.map((value)=>{
    return value*2;
})

let array = [{
    name : "Piyush",
    age : 23
},{
    name:"Avi",
    age : 26
},{
    name : "RK",
    age : 22
}];

function addfield(array){
    for(let i=0; i<array.length; i++){
        if(array[i].age<25){
            array[i].isAllowed = true;
        }else{
            array[i].isAllowed = false; 
        }
    }
    return array;
}
let ch = array.map((value)=>{
    if(value.age<25){
        value.isAllowed = true;
    }else{
        value.isAllowed = false;
    }
    return value;
})
console.log(ch);