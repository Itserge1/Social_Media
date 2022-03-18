const postControllers = require("../controllers/posts.controller");
const upload = require("../utils/multer");


module.exports = app => {
    app.get("/api/post/find", postControllers.GetAllPost)
    app.get("/api/post/find/:username", postControllers.GetAllProfilePost)
    app.get("/api/post/find/onlyuser/:username", postControllers.GetOnlyUserPost)
    app.post("/api/newpost", upload.single('image'), postControllers.NewPost)
    app.post("/api/post/find/:_id", postControllers.GetOnePost)
    app.put("/api/update/post/:_id", postControllers.UpdatePost)
    app.put("/api/post/like/:_id", postControllers.LikePost)
    app.delete("/api/delete/post/:_id", postControllers.DeletePost)
}