const user = require("../models/users.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




// REGISTER
module.exports.Register = (req, res) => {
    user.create(req.body)
        .then(newUser => {
            // Creating a user token to keep track of whoevere just register. (PS: it is like session)
            const userToken = jwt.sign({
                id: newUser._id,
                username: newUser.username
            }, process.env.SECRET_KEY);

            // note that the response object allows chained calls to cookie and json
            res
                .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                    httpOnly: true
                })
                .json({ msg: "success!", results: newUser });
            // res.json({results: newUser})
        })
        .catch(error => {
            console.log(req.body)
            res.json({ message: "Invalid registration attemp!!!", error:error })
        })
}

// LOGIN
module.exports.Login = async (req, res) => {
    try {
        // Validate email
        const useR = await user.findOne({ email: req.body.email });
        !useR && res.status(400).json({ message: "Email does not existe please register!" });

        // Validate password
        const validPassword = await bcrypt.compare(req.body.password, useR.password) // use bcrypt later
        !validPassword && res.status(400).json({ message: "invalid login attempt!" })

        // if we made it this far, the password was correct.
        // Creating a user token to keep track of whoevere just login. (PS: it is like session)
        const userToken = await jwt.sign({
            id: useR._id,
            username: useR.username,
        }, process.env.SECRET_KEY);

        // note that the response object allows chained calls to cookie and json
        res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, {
                httpOnly: true
            })
            .json({ msg: "Successful Login!", useR: useR });

    } catch (err) {
        console.log(err);
    }
}

module.exports.Users = (req, res) => {
    user.find({})
        .then(allUsers => res.json(allUsers))
        .catch(error => res.status(400).json({ message: "That did no work!!!", error }))
}
module.exports.auths = (req, res) => {
    res.json({ message: "list of all auths" })
}

// LOGOUT
module.exports.Logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}
