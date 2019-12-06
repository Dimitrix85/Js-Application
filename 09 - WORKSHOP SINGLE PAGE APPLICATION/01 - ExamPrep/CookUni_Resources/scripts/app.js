import * as homeController from "./Controllers/homeController.js"
import * as userController from "./Controllers/userController.js"
import * as recipesController from "./Controllers/recipesControler.js"

const app = Sammy("#rooter",function(){

    this.use("Handlebars","hbs");
    //home pages
    this.get('/', homeController.getSlash);

    this.get('/index.html', homeController.getSlash);

    this.get('/home', homeController.getSlash);

    //login pages
    this.get('/login', userController.getLogin);

    this.post('/login', userController.postLogin);

    this.get('/register', userController.getRegister);

    this.post('/register', userController.postRegister);

    this.get('/logout', userController.postLogout);

    //recipes
    this.get('/create/share', recipesController.getCreateShare);

    this.post('/create/share', recipesController.postCreateShare);

    this.get('/details/:id', recipesController.getDetailsById);

    this.get('/like/:id', recipesController.getLike);

    this.get('/delete/:id', recipesController.getDelete);

    this.get('/edit/:id', recipesController.getEdit);

    this.post('/edit/:id', recipesController.putEdit);
    
});

app.run();