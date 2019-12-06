import * as requster from "../requester.js"
import * as common from "../Common/common.js"

export function getLogin(ctx) {
    common.partials["loginForm"] = "./templates/login/loginForm.hbs";

    this.loadPartials(common.partials)
        .then(function () {
            this.partial("./templates/login/loginPage.hbs")
        })
}

export function postLogin(ctx) {
    let { username, password } = ctx.params;

    requster.post("user", "login", { username, password }, "Basic")
        .then(ui =>{
            sessionStorage.setItem("authtoken", ui._kmd.authtoken);
            sessionStorage.setItem("username", ui.username);
            sessionStorage.setItem("id", ui._id);

            ctx.redirect("/");
        })
        .catch(console.error);
}

export function getRegister(ctx) {
    common.partials["registerForm"] = "./templates/register/registerForm.hbs";

    this.loadPartials(common.partials)
        .then(function () {
            this.partial("./templates/register/registerPage.hbs")
        })
}

export function postRegister(ctx) {
    let { username, password, repeatPassword } = ctx.params;

    if (!username || !password || password !== repeatPassword) {
        throw new Error("Invalid input");
    }

    let user = {
        username,
        password
    }

    requster.post('user', "", user, 'Basic')
        .then(x => {
            ctx.redirect("/login");
        })
        .catch(console.error);
}

export function postLogout(ctx){
    
    requster.post("user","_logout")
    .then(x=>{
        sessionStorage.clear();
        ctx.redirect("/");
    })
    .catch(console.error);
}

