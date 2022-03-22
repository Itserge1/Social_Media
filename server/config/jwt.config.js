const jwt = require("jsonwebtoken"); // Creating a middleware
// Creating a function (authenticate) that take in three parameters
// the next parameter in a functin that tells or code to do the next this it's supposed to do after
// running this part successfully
module.exports.authenticate = (req, res, next) => {
    // Verifying that the user that is trying to access a page has a cookies 
    jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            next();
        }
    });
}