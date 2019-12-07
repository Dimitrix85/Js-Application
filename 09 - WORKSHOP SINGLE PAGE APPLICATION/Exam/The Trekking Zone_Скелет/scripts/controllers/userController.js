import * as requster from "../requester.js"
import * as common from "../Common/common.js"

export function getLogin(ctx) {
    this.loadPartials(common.partials)
        .then(function () {
            this.partial("./templates/login/login.hbs")
        })
}

export function postLogin(ctx) {
    common.displayLoading();
    let { username, password } = ctx.params;

    requster.post("user", "login", { username, password }, "Basic")
        .then(ui => {
            sessionStorage.setItem("authtoken", ui._kmd.authtoken);
            sessionStorage.setItem("username", ui.username);
            sessionStorage.setItem("id", ui._id);
        }).then(() => {
            setTimeout(() => {
                common.displaySucces('Successfully login.');
            }, 1000);
            common.hideLoading();
             ctx.redirect('/')
        })
        .catch(()=>{
            common.hideLoading();
            common.displayError("Invalid login")}
            );
}

export function getRegister(ctx) {

    this.loadPartials(common.partials)
        .then(function () {
            this.partial("./templates/register/register.hbs")
        })
}

export function postRegister(ctx) {
    common.displayLoading();
    let { username, password, rePassword } = ctx.params;
    if (username.length < 3 || password.length < 6 || password !== rePassword) {
        common.hideLoading();
        common.displayError("Username be at least 3 characters and password at least 6 characters");
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
        }).then(() => {
            setTimeout(() => {
                common.displaySucces('Successfully Register.');
            }, 1000);
            common.hideLoading();
             ctx.redirect('/')
        })
        .catch(()=>{
            common.hideLoading();
            common.displayError("Invalid Register")}
            );
}

export function postLogout(ctx) {
    common.displayLoading();
    requster.post("user", "_logout")
        .then(() => {
            setTimeout(() => {
                common.displaySucces('Successfully Logout.');
            }, 1000);
            sessionStorage.clear()
            common.hideLoading();
            ctx.redirect(`/`)
        })
        .catch(()=>{
            common.hideLoading();
            common.displayError("Invalid Logout")}
            );
}

export function getProfile(ctx){
    common.displayLoading();
    common.getSeesionInfo(ctx);
    requster.get("appdata",`treks?query={"_acl.creator":"${ctx.id}"}`)
    .then(data =>{
        ctx.profile = data;
        ctx.count = data.length;
        debugger;
        this.loadPartials(common.partials)
            .then(function () {
                this.partial("./templates/profile/profile.hbs")
                common.hideLoading();
            })

    })
}

