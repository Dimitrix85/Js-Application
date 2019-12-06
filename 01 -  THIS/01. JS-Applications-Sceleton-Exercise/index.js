function solve() {
   let rows = Array.from(document.querySelectorAll("tr")).slice(1);

   rows.map(x=>x.addEventListener("click", function () {
      if (this.hasAttribute("style")) {
         this.removeAttribute("style");
      } else {
         this.setAttribute("style", "background-color: rgb(65, 63, 94)");
      }

      rows.map(y=>{
         if (y.hasAttribute("style") && y !== this) {
            y.removeAttribute("style");
         } 
      })
   }));
}
