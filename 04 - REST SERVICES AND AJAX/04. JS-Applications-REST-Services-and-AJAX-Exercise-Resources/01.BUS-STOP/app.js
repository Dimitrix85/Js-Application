function getInfo() {
    const stopId = document.getElementById("stopId");
    let url = `https://judgetests.firebaseio.com/businfo/${stopId.value}.json`;
    const bussesContainer = document.getElementById("buses");
    const stopNameDiv = document.getElementById("stopName");


    if (!stopId || !bussesContainer || !stopNameDiv) {
        throw new Error("Missing element from dom!");
    }

    bussesContainer.textContent = "";
    stopNameDiv.textContent = "";

    fetch(url)
        .then(res => res.json())
        .then(data => {
            let { name, buses } = data;
            stopNameDiv.textContent = name;

            Object.entries(buses)
                .forEach(([busId, time]) => {
                    let li = document.createElement("li");
                    li.textContent = `Bus ${busId} arrives in ${time}`;

                    bussesContainer.appendChild(li);
                });
        })
        .catch(()=>{
            stopNameDiv.textContent = "Error";
        })
}