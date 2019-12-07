import * as requster from "../requester.js"
import * as common from "../Common/common.js"

export function getLogin(ctx) {

    this.loadPartials(common.partials)
        .then(function () {
            this.partial("./templates/login/login.hbs")
        })
        .catch(console.error);
}

export function postLogin(ctx) {
    let { username, password } = ctx.params;
    common.displayLoading();
    requster.post("user", "login", { username, password }, "Basic")
        .then(ui => {
            sessionStorage.setItem("authtoken", ui._kmd.authtoken);
            sessionStorage.setItem("username", ui.username);
            sessionStorage.setItem("id", ui._id);
            sessionStorage.setItem("names", ui.firstName + " " + ui.lastName);
            // ctx.redirect("/");
            //common.displayLoad();
        }).then(() => {
            setTimeout(() => {
                common.displaySucces('Successfully Login.');
            }, 1000);
            ctx.redirect('/')
            common.hideLoading();
        }).catch((e) => {
            common.displayError('Invalid Login!');
            console.error(e);
        });
}

export function getRegister(ctx) {

    this.loadPartials(common.partials)
        .then(function () {
            this.partial("./templates/register/register.hbs")
        })
}

export function postRegister(ctx) {
    let { firstName, lastName, username, password, repeatPassword } = ctx.params;

    if (firstName.length < 2 || lastName.length < 2 || username.length < 3 || password.length < 3 || password !== repeatPassword) {
        common.displayError("Invalid params");
        return;
    }

    let user = {
        username,
        password,
        firstName,
        lastName
    }

    requster.post('user', "", user, 'Basic')
        .then(ui => {
            sessionStorage.setItem("authtoken", ui._kmd.authtoken);
            sessionStorage.setItem("username", ui.username);
            sessionStorage.setItem("id", ui._id);
            sessionStorage.setItem("names", ui.firstName + " " + ui.lastName);
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

