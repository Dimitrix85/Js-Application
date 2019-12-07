import * as homeController from "./controllers/homeController.js"
import * as userController from "./controllers/userController.js"
import * as trekController from "./controllers/trekController.js"

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

    this.get('/create', trekController.getCreate);

    this.post('/create', trekController.postCreate);

    this.get('/trek/:id', trekController.getTrek);

    this.get('/edit/:id', trekController.getEdit);

    this.post('/edit/:id', trekController.postEdit);

    this.get('/delete/:id', trekController.getDelete);

    this.get('/like/:id', trekController.getLikes);
})

app.run("/");