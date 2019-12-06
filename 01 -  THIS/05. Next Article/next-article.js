function getArticleGenerator(articles) {
    let div = document.getElementById("content");
    //let index = 0;
    return function showNext() {
        if (articles.length > 0 /*&& index < articles.length*/) {
            let article = document.createElement("article");
            //article.textContent = articles[index++];
            article.textContent = articles.shift();
            div.appendChild(article);
        }
    }
}
