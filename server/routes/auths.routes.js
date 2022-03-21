const AuthControllers = require("../controllers/auths.controller");
// const user = require("../models/users.model")


module.exports = (app) => {
    // Register a user
    app.post("/api/register", AuthControllers.Register);
    app.post("/api/login", AuthControllers.Login)
    app.get("/api/logout", AuthControllers.Logout)
}