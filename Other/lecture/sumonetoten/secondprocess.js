

var sendObj ={
    method : "GET"
}
function logResponseBody(jsonbody){
    console.log(jsonbody);
}
function callbackFn(result){
    result.json().then(logResponseBody);
}
fetch("http://localhost:3000/handleSum?counter=10",sendObj).then(callbackFn);