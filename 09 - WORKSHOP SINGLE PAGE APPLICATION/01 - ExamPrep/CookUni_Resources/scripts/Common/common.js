export function getSeesionInfo(ctx) {
    ctx.loggedIn = sessionStorage.getItem("authtoken") !== null;
    ctx.username = sessionStorage.getItem("username");
    ctx.names = sessionStorage.getItem("names");
    ctx.id = sessionStorage.getItem("id");
}

export let partials = {
    header: "./templates/common/header.hbs",
    footer: "./templates/common/footer.hbs"
}

// export function displayError(message){
//     const errorBox = document.getElementById("errorBox");
//     errorBox.style.display = "block";
//     errorBox.textContent = message;
//     setTimeout(()=>{
//         errorBox.style.display = "none";
//     },3500);
// }

export function displayLoading(){
    const loadingBox = document.getElementById("loadingBox");
    loadingBox.style.display = "block";
}

export function hideLoading(){
    const loadingBox = document.getElementById("loadingBox");
    loadingBox.style.display = "none";
}

export function displayError(message) {
    const errorBox = document.getElementById('errorBox');
    errorBox.style.display = 'block';
    errorBox.textContent = message;
    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 2000);
}
export function displaySucces(message) {
    const successBox = document.getElementById('successBox');
    successBox.style.display = 'block';
    successBox.textContent = message;
    setTimeout(() => {
        successBox.style.display = 'none';
    }, 2000);
}

// export function displayLoad() {
//     const loading = document.getElementById('loadingBox');
//     loading.style.display = 'block';
//     loading.textContent = 'Loading...';
//     setTimeout(() => {
//         loading.style.display = 'none';
//     }, 4000);
// }