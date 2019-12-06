import * as requster from "../requester.js"
import * as common from "../Common/common.js"

export function getLogin(ctx) {

    this.loadPartials(common.partials)
        .then(function () {
            this.partial("./templates/login/login.hbs")
        })
}

export function postLogin(ctx) {
    let { username, password } = ctx.params;

    requster.post("user", "login", { username, password }, "Basic")
        .then(ui => {
            sessionStorage.setItem("authtoken", ui._kmd.authtoken);
            sessionStorage.setItem("username", ui.username);
            sessionStorage.setItem("id", ui._id);

            ctx.redirect("/");
        })
        .catch(()=>common.displayError("Invalid login"));
}

export function getRegister(ctx) {

    this.loadPartials(common.partials)
        .then(function () {
            this.partial("./templates/register/register.hbs")
        })
}

export function postRegister(ctx) {
    let { username, password, rePassword } = ctx.params;

    if (username.length > 3 || password.length > 6 || password !== rePassword) {
        common.displayError("Invalid params");
        return;
    }

    let user = {
        username,
        password
    }

    requster.post('user', "", user, 'Basic')
        .then(ui => {
            sessionStorage.setItem("authtoken", ui._kmd.authtoken);
            sessionStorage.setItem("username", ui.username);
            sessionStorage.setItem("id", ui._id);
            ctx.redirect("/");
        })
        .catch(()=> common.displayError("Invalid params"));
}

export function postLogout(ctx) {

    requster.post("user", "_logout")
        .then(x => {
            sessionStorage.clear();
            ctx.redirect("/");
        })
        .catch(console.error);
}

export function getProfile(ctx){
    common.getSeesionInfo(ctx);
    requster.get("appdata",`events?query={"_acl.creator":"${ctx.id}"}`)
    .then(data =>{
        ctx.profile = data;
        ctx.count = data.length;
        debugger;
        this.loadPartials(common.partials)
            .then(function () {
                this.partial("./templates/profile/profile.hbs")
            })

    })
}

