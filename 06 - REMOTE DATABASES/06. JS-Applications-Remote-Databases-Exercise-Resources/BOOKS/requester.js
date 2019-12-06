let username = "test";
let userPassword = "123456";

let apiKey = "kid_Sk7VEiRoS";

let baseUrl = "https://baas.kinvey.com"


function makeHeaders(method, body) {

    let header = {
        method: method,
        headers: {
            "Content-Type": "application/json" ,
            "Authorization": `Basic ${btoa(`${username}:${userPassword}`)}`
        }
    }

    if (method === "POST" || method === "PUT") {
        header.body = JSON.stringify(body);
    }

    return header;
}

function requestHandler(kinveyModule, endPoint, headers) {

    let url = `${baseUrl}/${kinveyModule}/${apiKey}/${endPoint}`;

    return fetch(url, headers).then(parseData);
}

export function getRequest(kinveyModule, endPoint) {
    let headers = makeHeaders("GET");

    return requestHandler(kinveyModule, endPoint, headers);
}

export function postRequest(kinveyModule, endPoint, data) {
    let headers = makeHeaders("POST", data);

    return requestHandler(kinveyModule, endPoint, headers);
}

export function putRequest(kinveyModule, endPoint, data) {
    let headers = makeHeaders("PUT", data);

    return requestHandler(kinveyModule, endPoint, headers);
}

export function deleteRequst(kinveyModule, endPoint) {
    let headers = makeHeaders("DELETE");

    return requestHandler(kinveyModule, endPoint, headers);
}

function parseData(x) {
    return x.json();
}

