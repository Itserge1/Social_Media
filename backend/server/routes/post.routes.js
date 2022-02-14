const postControllers = require("../controllers/posts.controller");


module.exports = app => {
    app.post("/api/newpost", postControllers.NewPost)
    app.put("/api/update/post/:_id", postControllers.UpdatePost)
    app.delete("/api/delete/post/:_id", postControllers.DeletePost)
    app.put("/api/like/post/:_id", postControllers.LikePost)
    app.post("/api/post/find/:_id", postControllers.GetOnePost)
    app.post("/api/post/find", postControllers.GetAllPost)
}