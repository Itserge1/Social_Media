const userControllers = require("../controllers/users.controller");
// const authors = require("../models/authors.model");

module.exports = app => {
    app.patch("/api/update", userControllers.UpdateUser);
    app.delete("/api/delete/:_id", userControllers.DeleteUser);
    app.get("/api/finduser", userControllers.GetLoggedInUser);
    app.post("/api/find", userControllers.FindAllUser);
    app.put("/api/follow/:_id", userControllers.FollowUser)
    app.put("/api/unfollow/:_id", userControllers.UnFollowUser)
}