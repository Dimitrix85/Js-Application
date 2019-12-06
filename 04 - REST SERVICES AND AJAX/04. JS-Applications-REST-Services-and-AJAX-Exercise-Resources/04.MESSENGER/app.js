function attachEvents() {
    let actions = {
        "refresh": () => refreshMsg(),
        "submit": () => submitMsg()
    }

    const url = `https://rest-messanger.firebaseio.com/messanger.json`;

    document.addEventListener("click", eventHangler);

    function eventHangler(e) {
        if (typeof actions[e.target.id] === "function") {
            actions[e.target.id](e);
        }
    }

    function refreshMsg() {

        let messages = document.getElementById("messages");
        messages.textContent = "";

        fetch(url)
            .then(errorHandler)
            .then(res => res.json())
            .then(data => {
                Object.entries(data).forEach(element => {
                    let { author, content } = element[1];

                    messages.textContent += `${author}: ${content}\n`;
                });
            })
            .catch(() => {
                throw new Error("Bad request");
            })
    }

    function submitMsg() {
        let authorInput = document.getElementById("author");
        let contentInput = document.getElementById("content");

        let header = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ author: authorInput.value, content: contentInput.value })
        };


        fetch(url, header)
            .then(errorHandler)
            .then(() => {
                refreshMsg();
                authorInput.value = "";
                contentInput.value = "";
            })
    }

    function errorHandler(e) {
        if (!e.status === 200) {
            throw new Error("Bad status");
            return;
        }

        return e;
    }


}

attachEvents();