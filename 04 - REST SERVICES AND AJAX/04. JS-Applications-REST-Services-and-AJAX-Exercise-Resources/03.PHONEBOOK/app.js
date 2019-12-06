function attachEvents() {

    let actions = {
        "btnLoad": ()=> loadNumbers(),
        "btnCreate":()=> createNumber(),
        "btnDelete": (e)=> deleteNumber(e)
    }
    const url = "https://phonebook-nakov.firebaseio.com/phonebook.json";

    document.addEventListener("click", eventHangler);

    function eventHangler(e) {
        if (typeof actions[e.target.id] === "function") {
            actions[e.target.id](e);
        }
    }

    function createNumber() {
        let personInput = document.getElementById("person");
        let phoneInput = document.getElementById("phone");
        let person = personInput.value;
        let phone = phoneInput.value;

        let headers = {
            method: "POST", 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ person,phone })
        }

        fetch(url,headers)
        .then(errorHandler)
        .then(()=>{
            personInput.value = "";
            phoneInput.value = "";
            loadNumbers();
        })
        .catch(()=>{
            throw new Error("Bad request");
        })
    }

    function loadNumbers() {
        let phonebookList = document.getElementById("phonebook");
        phonebookList.textContent = "";
        fetch(url)
            .then(errorHandler)
            .then(res => res.json())
            .then(data => {
                Object.entries(data).forEach((element) => {
                    let [elementId, phoneBook] = element;
                    let { person, phone } = phoneBook;
                    let li = document.createElement("li");
                    li.textContent = `${person}: ${phone}`;
                    let deleteBtn = document.createElement("button");
                    deleteBtn.setAttribute("data-target", elementId);
                    deleteBtn.setAttribute("id", "btnDelete");
                    deleteBtn.textContent = "Delete";
                    li.appendChild(deleteBtn);
                    phonebookList.appendChild(li);
                });
            })
            .catch(()=>{
                throw new Error("Bad request");
            })
    }

    function deleteNumber(e) {
        let id = e.target.getAttribute("data-target");
       let deleteUrl = `https://phonebook-nakov.firebaseio.com/phonebook/${id}.json`;
       let headers = {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
    }
        fetch(deleteUrl,headers)
        .then(errorHandler)
        .then(()=>{
            loadNumbers()
        })
        .catch(()=>{
            throw new Error("Bad request");
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