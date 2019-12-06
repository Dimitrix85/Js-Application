export function getSeesionInfo(ctx) {
    ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
    ctx.username = sessionStorage.getItem("username");
    ctx.id = sessionStorage.getItem("id");
}

export let partials = {
    header: "./templates/common/header.hbs",
    footer: "./templates/common/footer.hbs"
}