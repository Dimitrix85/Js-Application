import * as common from "../common/common.js"
import * as requester from "../requester.js"

export function getSlash(ctx) {
    common.getSeesionInfo(ctx);

    if (ctx.loggedIn) {
        requester.get("appdata", "treks")
            .then(data => {
                ctx.treks = data;
                this.loadPartials(common.partials)
                    .then(function () {
                        this.partial("./templates/home/home.hbs");
                    })
            })
    } else {
        this.loadPartials(common.partials)
            .then(function () {
                this.partial("./templates/home/home.hbs");
            })
    }

}