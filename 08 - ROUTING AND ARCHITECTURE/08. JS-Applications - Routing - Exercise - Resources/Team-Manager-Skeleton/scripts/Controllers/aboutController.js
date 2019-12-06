import * as common from "../Common/common.js"

export function getAbout(ctx) {
    common.getSeesionInfo(ctx);
    this.loadPartials(common.partials)
        .then(function () {
            this.partial("./templates/about/about.hbs")
        })
}