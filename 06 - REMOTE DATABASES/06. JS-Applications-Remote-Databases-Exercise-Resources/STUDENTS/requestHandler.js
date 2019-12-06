let username = "test";
let userPassword = "123456";

let apiKey = "kid_Sk7VEiRoS";

let baseUrl = "https://baas.kinvey.com/appdata/kid_Sk7VEiRoS/students/";


function makeHeaders(method) {

    let header = {
        method: method,
        headers: {
            "Content-Type": "application/json" ,
            "Authorization": `Basic ${btoa(`${username}:${userPassword}`)}`
        }
    }

    return header;
}

function requestHandler(headers) {

    return fetch(baseUrl, headers).then(errorHandler).then(parseData);
}

export function get(){
    let headers = makeHeaders("GET");

    return requestHandler(headers);
}


function errorHandler(x){
    if (!x.ok) {
        throw new Error("Bad Request");
    }
    return x;
}

function parseData(x){
    return x.json();
}