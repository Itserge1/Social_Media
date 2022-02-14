const user = require("../models/users.model")
const bcrypt = require("bcrypt");




// REGISTER
module.exports.Register =  (req, res) => {
    user.create(req.body)
    .then(newUser => res.json({results: newUser}))
    .catch(error => {
        console.log(req.body)
        return res.status(400).json({message: "That did no work!!!", error})
    })
}

// LOGIN
module.exports.Login = async (req, res) => {
    try{
        // Validate email
        const useR = await user.findOne({email: req.body.email});
        !useR && res.status(400).json({message: "Email does not existe please register!"});

        // Validate password
        const validPassword = await  bcrypt.compare(req.body.password, useR.password) // use bcrypt later
        !validPassword && res.status(400).json({message: "invalid login attempt"})

        res.status(200).json(useR)
    }catch (err) {
        console.log(err);
    }
}

module.exports.Users =  (req, res) => {
    user.find({})
    .then(allUsers => res.json(allUsers))
    .catch(error => res.status(400).json({message: "That did no work!!!", error}))
}
module.exports.auths = (req, res) => {
    res.json({message: "list of all auths"})
}