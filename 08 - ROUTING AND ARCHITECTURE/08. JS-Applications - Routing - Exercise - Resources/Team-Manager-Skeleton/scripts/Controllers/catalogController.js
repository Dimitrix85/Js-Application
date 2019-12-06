import * as common from "../Common/common.js"
import * as requster from "../requester.js"

export function getCatalog(ctx){
    common.getSeesionInfo(ctx);
    common.partials["team"] = "./templates/catalog/team.hbs"

    requster.get("appdata","teams","Kinvey").
        then(x=>{
            ctx.teams = x;
            this.loadPartials(common.partials)
                .then(function () {
                    this.partial("./templates/catalog/teamCatalog.hbs")
                })
        })
}

export function getCatalogDetais(ctx){
    common.getSeesionInfo(ctx);
    requster.get("appdata",`teams/${ctx.params.id}`)
    .then(x=>{
        common.partials["teamControls"] = "../templates/catalog/teamControls.hbs";
        common.partials["teamMember"] = "../templates/catalog/teamMember.hbs";
        ctx.team = x;
        ctx.team.isAuthor = x._acl.creator === ctx.id ? true : false;
        ctx.team.isOnTeam = x.members.includes(ctx.username);
        this.loadPartials(common.partials)
            .then(function(){
                this.partial("../templates/catalog/details.hbs");
            })
    })
    .catch(console.error)
}