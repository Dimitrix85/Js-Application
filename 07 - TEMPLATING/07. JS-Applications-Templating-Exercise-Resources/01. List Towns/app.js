const loadBtn = document.getElementById("btnLoadTowns");
const input = document.getElementById("towns");
const container = document.getElementById("root");

loadBtn.addEventListener("click",loadCities);

async function loadCities(){
    let cities = input.value.trim().split(/[\s,]+/);
    const source = await fetch("http://127.0.0.1:5500/01.%20List%20Towns/cityList.hbs")
    .then(r=>r.text());
    let template = Handlebars.compile(source);
    container.innerHTML = template({cities});
    debugger;
}