import * as requster from "../requester.js"
import * as common from "../Common/common.js"

const categories = {
    'Grain food': 'https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg',
    'Milk, cheese, eggs and alternatives': 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg',
    'Vegetables and legumes/beans': 'https://www.eatforhealth.gov.au/sites/default/files/images/the_guidelines/101351132_vegetable_selection_web.jpg',
    'Fruits': 'https://studyabroad.bg/wp-content/uploads/2019/10/fruits-tropicals-marguery-exclusive-villas-1400x933.jpg',
    'Lean meats and poultry, fish and alternatives': 'https://i1.wp.com/www.daybyday.website/wp-content/uploads/2018/10/Nuts-And-Lean-Meat.jpeg?resize=618%2C412&ssl=1'
}

export function getCreateShare(ctx) {

    common.getSeesionInfo(ctx);
    this.loadPartials(common.partials)
        .then(function () {
            this.partial("../templates/recipes/create.hbs");
        })
}

export function postCreateShare(ctx) {

    common.getSeesionInfo(ctx);
    let { meal, prepMethod, description, foodImageURL, category } = ctx.params;

    if (meal && prepMethod && description && foodImageURL && category) {
        let recipe = {
            meal,
            prepMethod,
            description,
            foodImageURL,
            category,
            categoryImageURL: categories[category],
            likesCounter: 0,
            ingredients: ctx.params.ingredients.split(/[\s,]+/)
        };
        requster.post("appdata", "recipes", recipe)
            .then(x => {
                ctx.redirect('/');
            })
            .catch(() => common.displayError("Invalid params"));
    }
    else {
        common.displayError("Invalid params")
    }

}

export function getDetailsById(ctx) {
    common.getSeesionInfo(ctx);

    requster.get("appdata", `recipes/${ctx.params.id}`)
        .then(data => {
            ctx.recipe = data;
            ctx.own = ctx.id === data._acl.creator ? true : false;
            this.loadPartials(common.partials)
                .then(function () {
                    this.partial("../templates/recipes/details.hbs");
                })
        })
        .catch(console.error)
}

export function getLike(ctx) {
    common.getSeesionInfo(ctx);
    requster.get("appdata", `recipes/${ctx.params.id}`)
        .then(data => {
            data.likesCounter++;
            requster.put("appdata", `recipes/${ctx.params.id}`, data)
                .then(x => {
                    ctx.redirect(`/details/${ctx.params.id}`);
                })
        })
        .catch(()=> common.displayError("Invalid recipe"));
}

export function getDelete(ctx) {
    common.getSeesionInfo(ctx);
    requster.del("appdata", `recipes/${ctx.params.id}`)
        .then(x => {
            ctx.redirect('/');
        })
        .catch(()=> common.displayError("Invalid recipe"));
}

export function getEdit(ctx) {
    common.getSeesionInfo(ctx);

    requster.get("appdata", `recipes/${ctx.params.id}`)
        .then(data => {
            data.ingredients = data.ingredients.join(", ");
            ctx.edit = data;
            this.loadPartials(common.partials)
                .then(function () {
                    this.partial("../templates/recipes/edit.hbs");
                })
        })
        .catch(console.error);
}

export function putEdit(ctx) {
    debugger;
    common.getSeesionInfo(ctx);
    let editEntity = {
        meal: ctx.params.meal,
        ingredients: ctx.params.ingredients.split(/[\s,]+/),
        prepMethod: ctx.params.prepMethod,
        description: ctx.params.description,
        foodImageURL: ctx.params.foodImageURL,
        category: ctx.params.category,
        categoryImageURL: categories[ctx.params.category],

    }
    requster.put("appdata", `recipes/${ctx.params.id}`, editEntity)
        .then(x => {
            ctx.redirect(`/details/${ctx.params.id}`);
        })
        .catch(()=> common.displayError("Invalid params"));
}