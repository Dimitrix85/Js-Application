import * as homeController from "./Controllers/homeController.js"
import * as aboutController from "./Controllers/aboutController.js"
import * as userController from "./Controllers/userController.js"
import * as catalogController from "./Controllers/catalogController.js"
import * as teamController from "./Controllers/teamController.js"

const app = Sammy("#main",function(){

    this.use("Handlebars","hbs");
    //home pages
    this.get('/', homeController.getSlash);

    this.get('/index.html', homeController.getSlash);

    this.get('/home', homeController.getSlash);

    //about page
    this.get('/about', aboutController.getAbout);

    //login pages
    this.get('/login', userController.getLogin);

    this.post('/login', userController.postLogin);

    this.get('/register', userController.getRegister);

    this.post('/register', userController.postRegister);

    this.get('/logout', userController.postLogout);

    //catalog pages
    this.get('/catalog', catalogController.getCatalog);

    this.get('/catalog/:id', catalogController.getCatalogDetais);

    //team pages
    this.get('/create', teamController.getCreate);

    this.post('/create', teamController.postCreate);

    this.get('/join/:id', teamController.getJoinTeam);

    this.get('/leave/:id', teamController.getLeaveTeam);

    this.get('/edit/:id', teamController.getEdit);

    this.post('/edit/:id', teamController.putEdit);
});

app.run();