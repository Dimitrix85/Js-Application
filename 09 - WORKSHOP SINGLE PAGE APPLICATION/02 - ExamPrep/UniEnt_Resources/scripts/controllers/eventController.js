import * as common from "../common/common.js"
import * as requester from "../requester.js"

export function getOrganize(ctx) {
    common.getSeesionInfo(ctx);

    this.loadPartials(common.partials)
        .then(function () {
            this.partial("./templates/events/organize.hbs");
        })
}

export function postOrganize(ctx) {
    common.getSeesionInfo(ctx);

    let { name, dateTime, description, imageURL } = ctx.params;

    if (name.length < 6 || !dateTime || description.length < 10 || !imageURL) {
        throw new Error("Invalid input")
    }

    let event = {
        name,
        dateTime,
        description,
        imageURL,
        organizer : ctx.username,
        interested : 0
    }

    requester.post("appdata", "events", event)
        .then(x => {
            ctx.redirect("/");
        })
        .catch(console.error);
}

export function getDetails(ctx) {
    common.getSeesionInfo(ctx);
    requester.get("appdata", `events/${ctx.params.id}`)
        .then(data => {
            ctx.own = ctx.id === data._acl.creator ? true : false;
            ctx.event = data;
            this.loadPartials(common.partials)
                .then(function () {
                    this.partial("../templates/events/details.hbs");
                })
        })
}

export function getEdit(ctx){
    common.getSeesionInfo(ctx);
    requester.get("appdata", `events/${ctx.params.id}`)
    .then(data =>{
        ctx.edit = data;
        this.loadPartials(common.partials)
                .then(function () {
                    this.partial("../templates/events/edit.hbs");
                })
    })
}

export function postEdit(ctx){
    common.getSeesionInfo(ctx);
    let { name,
        dateTime,
        description,
        imageURL,
        organizer,
        interested} = ctx.params;
    requester.put("appdata", `events/${ctx.params.id}`,{ name,
        dateTime,
        description,
        imageURL,
        organizer,
        interested})
        .then(x=>{
            ctx.redirect(`/event/${ctx.params.id}`)
        });
}

export function getDelete(ctx){
    common.getSeesionInfo(ctx);

    requester.del("appdata",`events/${ctx.params.id}`)
        .then(x=>{
            ctx.redirect('/');
        })
}

export function getJoin(ctx){
    common.getSeesionInfo(ctx);

    requester.get("appdata",`events/${ctx.params.id}`)
        .then(data =>{
            data.interested++;
            requester.put("appdata",`events/${ctx.params.id}`, data)
            .then(x=>{
                ctx.redirect(`/event/${ctx.params.id}`);
            })
        })
}