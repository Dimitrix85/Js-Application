import * as common from "../common/common.js"
import * as requester from "../requester.js"

export function getCreate(ctx) {
    common.getSeesionInfo(ctx);
    this.loadPartials(common.partials)
        .then(function () {
            this.partial("./templates/trek/create.hbs")
        })
}

export function postCreate(ctx) {
    common.displayLoading();
    common.getSeesionInfo(ctx);
    let data = {
        ...ctx.params,
        organizer: ctx.username,
        likes: 0
    }

    if (data.location.length < 6 || data.description.length < 10) {
        common.hideLoading();
        common.displayError("Name at least 6 characters and description at least 10 characters")
        return;
    }
    requester.post("appdata", "treks", data)
        .then(() => {
            setTimeout(() => {
                common.displaySucces('Successfully Create.');
            }, 1000);
            common.hideLoading();
             ctx.redirect('/')
        })
        .catch(()=>{
            common.hideLoading();
            common.displayError("Invalid Create")}
            );

}

export function getTrek(ctx) {
    common.displayLoading();
    common.getSeesionInfo(ctx);
    requester.get("appdata", `treks/${ctx.params.id}`)
        .then(data => {
            ctx.trek = data;
            ctx.trek.own = ctx.username === data.organizer;
            this.loadPartials(common.partials)
                .then(function () {
                    common.hideLoading();
                    this.partial("../templates/trek/trek.hbs")
                })
        }).catch(()=> common.displayError("Something wrong"));
}

export function getEdit(ctx) {
    common.getSeesionInfo(ctx);
    common.displayLoading();
    requester.get("appdata", `treks/${ctx.params.id}`)
        .then(data => {
            ctx.trek = data;
            this.loadPartials(common.partials)
                .then(function () {
                    this.partial("../templates/trek/edit.hbs")
                    common.hideLoading();
                })
        })
}

export function postEdit(ctx) {
    common.getSeesionInfo(ctx);
    common.displayLoading();
    let data = {...ctx.params};
    
    if (data.location.length < 6 || data.description.length < 10) {
        common.hideLoading();
        common.displayError("Name at least 6 characters and description at least 10 characters")
        return;
    }
    requester.put("appdata", `treks/${ctx.params.id}`, data)
    .then(() => {
        setTimeout(() => {
            common.displaySucces('Successfully Edited.');
        }, 1000);
        common.hideLoading();
        ctx.redirect(`/trek/${ctx.params.id}`)
    })
    .catch(()=>{
        common.hideLoading();
        common.displayError("Invalid Edited")}
        );
}

export function getDelete(ctx){
    common.getSeesionInfo(ctx);
    common.displayLoading();
    requester.del("appdata",`treks/${ctx.params.id}`)
    .then(() => {
        setTimeout(() => {
            common.displaySucces('Successfully Delete.');
        }, 1000);
        common.hideLoading();
        ctx.redirect(`/`)
    })
    .catch(()=>{
        common.hideLoading();
        common.displayError("Invalid Deleted")}
        );
}

export function getLikes(ctx){
    common.getSeesionInfo(ctx);
    common.displayLoading();
    requester.get("appdata",`treks/${ctx.params.id}`)
        .then(data =>{
            data.likes++;
            requester.put("appdata",`treks/${ctx.params.id}`, data)
            .then(() => {
                setTimeout(() => {
                    common.displaySucces('Successfully Like.');
                }, 1000);
                common.hideLoading();
                ctx.redirect(`/trek/${ctx.params.id}`);
            })
            .catch(()=>{
                common.hideLoading();
                common.displayError("Invalid Likes")}
                );
        })
        
}