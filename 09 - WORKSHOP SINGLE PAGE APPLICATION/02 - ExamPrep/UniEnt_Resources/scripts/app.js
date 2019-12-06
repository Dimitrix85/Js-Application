import * as homeController from "./controllers/homeController.js"
import * as userController from "./controllers/userController.js"
import * as eventController from "./controllers/eventController.js"

const app = Sammy("body",function(){
    this.use("Handlebars", "hbs");

     //home pages
     this.get('/', homeController.getSlash);

     this.get('/index.html', homeController.getSlash);
 
     this.get('/home', homeController.getSlash);

    this.get('/login', userController.getLogin);

    this.post('/login', userController.postLogin);

    this.get("/register", userController.getRegister);

    this.post('/register', userController.postRegister);

    this.get('/logout', userController.postLogout);

    this.get('/profile', userController.getProfile);


    this.get('/organize', eventController.getOrganize);

    this.post('/organize', eventController.postOrganize);

    this.get('/event/:id', eventController.getDetails);

    this.get('/edit/:id', eventController.getEdit);

    this.post('/edit/:id', eventController.postEdit);

    this.get('/delete/:id', eventController.getDelete);

    this.get('/join/:id', eventController.getJoin);

})

app.run("/");