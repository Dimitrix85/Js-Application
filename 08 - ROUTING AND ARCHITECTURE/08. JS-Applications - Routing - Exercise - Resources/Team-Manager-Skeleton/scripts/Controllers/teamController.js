import * as common from "../Common/common.js"
import * as requster from "../requester.js"

export function getCreate(ctx) {
    common.getSeesionInfo(ctx);
    common.partials["createForm"] = "./templates/create/createForm.hbs";
    this.loadPartials(common.partials)
        .then(function () {
            this.partial("../templates/create/createPage.hbs")
        })
        .catch(console.error)
}

export function postCreate(ctx) {
    common.getSeesionInfo(ctx);

    let { name, comment } = ctx.params;

    if (!name || !comment) {
        throw new Error("Invalid input");
    }

    let team = {
        name,
        comment,
        members: []
    }
    team.members.push(ctx.username)

    requster.post("appdata", "teams", team)
        .then(x => {
            ctx.redirect('/catalog');
        })
        .catch(console.error);
}

export async function getJoinTeam(ctx) {
    common.getSeesionInfo(ctx);
    let data = await requster.get("appdata", `teams/${ctx.params.id}`)
        .catch(console.error);
    data.members.push(ctx.username);

    requster.put("appdata", `teams/${ctx.params.id}`, data)
        .then(x => {
            ctx.redirect('/catalog');
        })
        .catch(console.error);
}

export function getLeaveTeam(ctx) {
    common.getSeesionInfo(ctx);
    requster.get("appdata", `teams/${ctx.params.id}`)
        .then(data => {
            data.members.splice(data.members.indexOf(ctx.username), 1);
            requster.put("appdata", `teams/${ctx.params.id}`, data)
                .then(x => {
                    ctx.redirect('/catalog');
                })
        })
        .catch(console.error);
}

export function getEdit(ctx) {
    common.getSeesionInfo(ctx);
    common.partials["editForm"] = "../templates/edit/editForm.hbs";
    requster.get("appdata", `teams/${ctx.params.id}`)
        .then(data => {
            ctx.edit = data;
            debugger;
            this.loadPartials(common.partials)
                .then(function () {
                    this.partial("../templates/edit/editPage.hbs");
                })
        })
        .catch(console.error);
}

export function putEdit(ctx) {
    let { name, comment } = ctx.params;
    if (!name || !comment) {
        throw new Error("Invalid input");
    }

    common.getSeesionInfo(ctx);

    requster.put("appdata", `teams/${ctx.params.id}`, { name, comment })
        .then(x => {
            ctx.redirect("/catalog");
        })
        .catch(console.error);

}