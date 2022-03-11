const userControllers = require("../controllers/users.controller");
const upload = require("../utils/multer")
// const authors = require("../models/authors.model");

module.exports = app => {
    app.patch("/api/update",userControllers.UpdateUserInfo);
    app.patch("/api/update/profilepicture/:_id", upload.single('image'), userControllers.UpdateUserProfilePicture);
    app.patch("/api/update/coverpicture", upload.single('image'), userControllers.UpdateUserCoverPicture);
    app.delete("/api/delete/:_id", userControllers.DeleteUser);
    app.get("/api/finduser", userControllers.GetLoggedInUser);
    app.get("/api/checkfollow/:_id", userControllers.CheckFollowUser);
    app.get("/api/finduser/:_id", userControllers.GetOneUser);
    app.get("/api/finduser/friends/:_id", userControllers.GetUserFriends);
    app.get("/api/finduser/username/:username", userControllers.GetOneUserByUsername);
    app.get("/api/find", userControllers.FindAllUser);
    app.put("/api/follow/:_id", userControllers.FollowUser)
    app.put("/api/unfollow/:_id", userControllers.UnFollowUser)
}