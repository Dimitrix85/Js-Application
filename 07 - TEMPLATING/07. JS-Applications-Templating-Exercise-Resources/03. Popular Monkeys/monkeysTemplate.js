import { monkeys } from "./monkeys.js"
(async function() {
    let source = await fetch("http://127.0.0.1:5500/03.%20Popular%20Monkeys/monkey.hbs")
            .then(r=>r.text());
    let template = Handlebars.compile(source);
    document.getElementsByClassName("monkeys")[0].innerHTML = template({monkeys});
    
    Array.from(document.getElementsByTagName("button")).forEach(el =>{
        el.addEventListener("click",function(e){
            debugger;
            let par = e.target.parentElement.querySelector("p");
            
            if ( par.style.display === "none") {
                par.style.display = "block";
                e.target.textContent = "HIDEN"
            }else{
                par.style.display = "none";
                e.target.textContent = "INFO";
            }
        });
    });
})()