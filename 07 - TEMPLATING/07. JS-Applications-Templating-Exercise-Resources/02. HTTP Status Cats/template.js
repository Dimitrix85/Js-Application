(function () {
    renderCatTemplate();

    async function renderCatTemplate() {
        let source = await fetch("http://127.0.0.1:5500/02.%20HTTP%20Status%20Cats/catsTemplate.hbs")
            .then(r => r.text());
        let template = Handlebars.compile(source);
        let src = template({ cats: window.cats });
        document.getElementById("allCats").innerHTML = src;

        Array.from(document.getElementsByTagName("button")).forEach(element => {
            element.addEventListener("click",function(e){
                    let divStatus =  e.target.parentElement.querySelector(".status");
                    if (divStatus.style.display === "none") {
                        divStatus.style.display = "block";
                        e.target.textContent = "Hidden status code";
                    }else{
                        divStatus.style.display = "none";
                        e.target.textContent = "Show status code";
                    }
            });
        });
    }
})()
