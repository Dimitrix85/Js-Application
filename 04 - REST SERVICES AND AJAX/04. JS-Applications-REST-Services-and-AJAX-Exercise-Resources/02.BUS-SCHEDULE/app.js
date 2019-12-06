function solve() {
    const infoField = document.getElementById("info");
    const departBtn = document.getElementById("depart");
    const arriveBtn = document.getElementById("arrive");
    let currentName;
    let nextId = "depot";

    if (!infoField || !departBtn || !arriveBtn) {
         throw new Error("Missing element from dom!");
    }

    
    function depart() {
        let url = `https://judgetests.firebaseio.com/schedule/${nextId}.json`
        
        departBtn.disabled = true;
        arriveBtn.disabled = false;
        
        fetch(url)
        .then(res=>res.json())
        .then(loadStop)
        .catch(()=>{
            infoField.textContent = "Error";
            departBtn.disabled = true;
        arriveBtn.disabled = true;
        })
    }

    function loadStop(data) {
            let { name, next } = data;
            currentName = name;
            nextId = next;
            infoField.textContent = `Next stop ${currentName}`;
    }

    function arrive() {
        departBtn.disabled = false;
        arriveBtn.disabled = true;
        infoField.textContent = `Arriving at ${currentName}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();