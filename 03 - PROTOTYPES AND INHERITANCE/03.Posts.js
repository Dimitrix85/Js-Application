function solveClasses() {
    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }

        toString() {
            return `Post: ${this.title}\nContent: ${this.content}`;
        }
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content);
            this.likes = likes;
            this.dislikes = dislikes;
            this.comments = [];
        }

        addComment(comment) {
            this.comments.push(comment);
        }

        toString() {
            return this.comments.length === 0 ?
                super.toString() + `\nRating: ${this.likes - this.dislikes}` :
                super.toString() + `\nRating: ${this.likes - this.dislikes}\nComments:\n` +
                this.comments.map(x => ` * ${x}`).join("\n");
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content);
            this.views = views;
        }

        view() {
            this.views++;
            return this;
        }

        toString() {
            return super.toString() + `\nViews: ${this.views}`;
        }
    }

    return {
        Post,
        SocialMediaPost,
        BlogPost
    }
}

function solveProto(){

    function Post(title,content){
        this.title = title;
        this.content = content;
    };

    Post.prototype.toString = function(){
        return `Post: ${this.title}\nContent: ${this.content}`;
    };

    function SocialMediaPost(title, content, likes, dislikes){
        Post.call(this,title,content);
        this.likes = likes;
        this.dislikes = dislikes;
        this.comments = [];
    }

    SocialMediaPost.prototype.addComment = function(comment) {
        this.comments.push(comment);
    };

    SocialMediaPost.prototype.toString = function(){
        return this.comments.length === 0 ?
                `Post: ${this.title}\nContent: ${this.content}\nRating: ${this.likes - this.dislikes}` :
                `Post: ${this.title}\nContent: ${this.content}\nRating: ${this.likes - this.dislikes}\nComments:\n` +
                this.comments.map(x => ` * ${x}`).join("\n");
    }

    // SocialMediaPost.prototype = Object.create(Post.prototype);

    Object.setPrototypeOf(SocialMediaPost,Post);
    Post.prototype.constructor = Post;

    function BlogPost(title, content, views){
        Post.call(this,title,content);
        this.views = views;
    }

    BlogPost.prototype.view = function() {
        this.views++;
        return this;
    };

    BlogPost.prototype.toString = function() {
        return `Post: ${this.title}\nContent: ${this.content}\nViews: ${this.views}`;
    }

    // BlogPost.prototype = Object.create(Post.prototype)
    Object.setPrototypeOf(BlogPost,Post);
    BlogPost.prototype.constructor = BlogPost;

    return {
        Post,
        SocialMediaPost,
        BlogPost
    }
}