let actions = {
    addBtn: () => addFish(),
    load: () => loadAll(),
    delete: (e) => deleteFish(e),
    update: (e) => updateFish(e)
}

let htmlElements = {
    catches: () => document.getElementById("catches"),
    addform: () => document.getElementById("addForm")
}

function attachEvents() {
    document.addEventListener("click", handlerEvent)
}

function addFish() {

    let node = htmlElements.addform();

    let newFish = {
        angler: node.children[2].value,
        weight: node.children[4].value,
        species: node.children[6].value,
        location: node.children[8].value,
        bait: node.children[10].value,
        captureTime: node.children[12].value,
    }
    let header = makeHeaders("POST", newFish);

    requestHandler(header)
        .then(() => {
            loadAll();
        })
}

function deleteFish(e) {
    let header = makeHeaders("DELETE");
    let fishId = e.target.attributes["targetId"].value;

    requestHandler(header, fishId)
        .then(() => {
            loadAll();
        })
}

function loadAll() {
    let header = makeHeaders("GET");
    requestHandler(header)
        .then(x => {
            htmlElements.catches().innerHTML = "";
            Object.entries(x).forEach(element => {
                let [id, data] = element;
                let hr = document.createElement("hr");
                let fragment = document.createDocumentFragment();
                let catchtDiv = document.createElement("div");
                catchtDiv.classList.add("catch");
                catchtDiv.setAttribute("data-id", id);

                let angler = createInput("Angler", "text", "angler", data.angler);
                let weight = createInput("Weight", "number", "weight", data.weight);
                let species = createInput("Species", "text", "species", data.species);
                let location = createInput("Location", "text", "location", data.location);
                let bait = createInput("Bait", "text", "bait", data.bait);
                let captureTime = createInput("Capture Time", "number", "captureTime", data.captureTime);
                let updateBtn = createBtn("Update", "update", "update", id);
                let deleteBtn = createBtn("Delete", "delete", "delete", id);

                fragment
                    .append(angler.label, angler.input, angler.hr,
                        weight.label, weight.input, weight.hr,
                        species.label, species.input, species.hr,
                        location.label, location.input, location.hr,
                        bait.label, bait.input, bait.hr,
                        captureTime.label, captureTime.input, captureTime.hr,
                        updateBtn, deleteBtn);
                catchtDiv.append(fragment);
                htmlElements.catches().append(catchtDiv);

            });
        });
}

function updateFish(e){

    let node = e.target.parentElement;
    let id = node.attributes["data-id"].value;
    let fish = {
        angler: node.children[1].value,
        weight: node.children[4].value,
        species: node.children[7].value,
        location: node.children[10].value,
        bait: node.children[13].value,
        captureTime: node.children[16].value,
    }
debugger;
    let header = makeHeaders("PUT", fish)

    requestHandler(header,id)
    .then(()=>{
        loadAll();
    })
}


function handlerEvent(e) {
    if (typeof actions[e.target.id] === "function") {
        actions[e.target.id](e);
    }
}

function createInput(content, type, clas, value) {
    let label = document.createElement("label");
    label.textContent = content;
    let input = document.createElement("input");
    input.type = type;
    input.classList.add(clas);
    input.defaultValue = value;
    let hr = document.createElement("hr");
    return {
        label,
        input,
        hr
    }
}

function createBtn(content, clas, tagId, id) {
    let btn = document.createElement("button");
    btn.textContent = content;
    btn.setAttribute("targetId", id);
    btn.id = tagId;
    btn.classList.add(clas);

    return btn;
}

function requestHandler(headers, id) {
    let baseUrl = "https://fisher-game.firebaseio.com/catches"

    if (id) {
        baseUrl = baseUrl + `/${id}.json`
    }
    else {
        baseUrl = baseUrl + ".json"
    }

    return fetch(baseUrl, headers).then(handelError).then(x => x.json());

}

function handelError(x) {
    if (!x.ok) {
        throw new Error("Bad request");
    }

    return x;
}

function makeHeaders(method, body) {

    let header = {
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    }

    if (method === "POST" || method === "PUT") {
        header.body = JSON.stringify(body);
    }

    return header;
}

attachEvents();

