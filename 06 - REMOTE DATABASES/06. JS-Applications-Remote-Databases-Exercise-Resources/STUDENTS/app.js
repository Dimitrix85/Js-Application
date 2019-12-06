import { get } from "./requestHandler.js"

let htmlElements = {
    students: () => document.getElementById("students")
};

function createTr(data) {
    let fragment = document.createDocumentFragment();
    let id = createTh(data.id);
    let firstName = createTh(data.firstName);
    let lastName = createTh(data.lastName);
    let facultyNumber = createTh(data.facultyNumber);
    let grade = createTh(data.grade);
    fragment.append(id, firstName, lastName, facultyNumber, grade);
    let tr = document.createElement("tr");
    tr.append(fragment);
    return tr;
}

function createTh(data) {
    let th = document.createElement("th");
    th.textContent = data;
    return th;
}

(function solve() {
    get()
    .then(x=>{
        x.forEach(element => {
            let tr = createTr(element);
            htmlElements.students().appendChild(tr);
        });
    })
})()