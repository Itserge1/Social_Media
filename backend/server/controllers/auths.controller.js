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
            res.json({ message: "That did no work!!!", error })
        })
}

// LOGIN


// 1
// module.exports.Login = async (req, res) => {
//     const useR = await user.findOne({ email: req.body.email });;

//     if (useR === null) {
//         // email not found in users collection
//         return res.sendStatus(400);
//     }

//     // if we made it this far, we found a user with this email address
//     // let's compare the supplied password to the hashed password in the database
//     const correctPassword = await bcrypt.compare(req.body.password, useR.password);

//     if (!correctPassword) {
//         // password wasn't a match!
//         return res.sendStatus(400);
//     }

//     // if we made it this far, the password was correct
//     const userToken = jwt.sign({
//         id: useR._id
//     }, process.env.SECRET_KEY);

//     // note that the response object allows chained calls to cookie and json
//     res
//         .cookie("usertoken", userToken, process.env.SECRET_KEY, {
//             httpOnly: true
//         })
//         .json({ msg: "success!" });
// }

// 2
module.exports.Login = async (req, res) => {
    try {
        // Validate email
        const useR = await user.findOne({ email: req.body.email });
        !useR && res.status(400).json({ message: "Email does not existe please register!" });

        // Validate password
        const validPassword = await bcrypt.compare(req.body.password, useR.password) // use bcrypt later
        !validPassword && res.status(400).json({ message: "invalid login attempt" })

        // if we made it this far, the password was correct.
        // Creating a user token to keep track of whoevere just login. (PS: it is like session)
        const userToken = jwt.sign({
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
