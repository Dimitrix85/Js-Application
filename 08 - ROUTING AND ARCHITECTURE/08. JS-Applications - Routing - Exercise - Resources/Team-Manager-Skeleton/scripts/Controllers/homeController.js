import * as common from "../Common/common.js"

export function getSlash(ctx) {
    common.getSeesionInfo(ctx);
    this.loadPartials(common.partials)
        .then(function () {
            this.partial("./templates/home/home.hbs");
        })
}