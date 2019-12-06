import * as common from "../Common/common.js"
import * as requester from "../requester.js"

export function getSlash(ctx) {
    common.getSeesionInfo(ctx);
    if (ctx.loggedIn) {
        requester.get("appdata", "recipes")
            .then(data => {
                ctx.recipes = data;
                this.loadPartials(common.partials)
                    .then(function () {
                        this.partial("./templates/home/home.hbs");
                    })
            })
    }
    else {
        this.loadPartials(common.partials)
            .then(function () {
                this.partial("./templates/home/home.hbs");
            })
    }
}