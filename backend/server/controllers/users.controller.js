const user = require("../models/users.model")

// UPDATE USER
module.exports.UpdateUser = (req, res) => {
    user.updateOne({_id: req.params._id}, req.body, {runValidators:true} )
    .then(updateUser => res.json({results: updateUser}))
    .catch(error => res.status(400).json({message: "That did not work!!!"}, error))
}
// DELETE A USER
module.exports.DeleteUser = (req, res) => {
    user.deleteOne({id: req.params._id})
    .then(DeleteUser => res.json({results: DeleteUser}))
    .catch(error => res.status(400).json({message: "That did not work!!"}, error))
}
// GET ON USER
module.exports.FindOneUser = (req, res) => {
    user.findOne({id: req.params._id})
        .then(OneUser => res.json({results: OneUser}))
        .catch(error => res.status(400).json({message: "That did not work!!!"}, error))
}
// GET ALL USERS
module.exports.FindAllUser = (req, res) => {
    user.find({})
        .then(AllUser => res.json({results: AllUser}))
        .catch(error => res.status(400).json({message: "That did not work!!!"}, error))
}
// FOLLOW A USER
module.exports.FollowUser = async (req, res) => {
    if(req.body._id === req.param._id){
        // it means that the are the same person
        res.status(403).json({message: "You can not follow yourself"} )
    } else{
        // it means that the are not the same person
        try{
            // find the desire follow user
            const useR = await user.findOne({_id: req.params._id})
            // find the user currently trying to follow someone
            const CurrentUseR = await user.findOne({_id: req.body._id})
            //  (NOT)if the user A who want to follow the user B, already have B in his following? 
            if(!useR.followers.includes(req.body._id)){
                // Adding B to A following.
                await CurrentUseR.updateOne({$push: {followings: req.params._id}})
                // Adding A to B followers.
                await useR.updateOne({$push: {followers: req.body._id}})
                res.status(200).json({message: "User has been followed"})
            } else{
                // Allreading following B
                res.status(403).json({message: "You are already following this user"})
            }
        }catch(err){
            res.status(500).json(err);
        }
    }
}

// UNFOLLOW A USER

module.exports.UnFollowUser = async (req, res) => {
    if(req.body._id === req.param._id){
        // it means that the are the same person
        res.status(403).json({message: "You can not unfollow yourself"} )
    } else{
        // it means that the are not the same person
        try{
            // find the user that is going to be unfollow
            const useR = await user.findOne({_id: req.params._id})
            // find the user currently trying to unfollow 
            const CurrentUseR = await user.findOne({_id: req.body._id})
            //  (NOT)if the user A who want to ufollow the user B, already have B in his following? 
            if(useR.followers.includes(req.body._id)){
                // A is currentlly following B, so A can unfollow B
                // Removing B from A following.
                await CurrentUseR.updateOne({$pull: {followings: req.params._id}})
                // Removing A from B followers.
                await useR.updateOne({$pull: {followers: req.body._id}})
                res.status(200).json({message: "User has been unfollowed"})
            } else{
                // not following B, so A can not unfollow B
                res.status(403).json({message: "You can not unfollow this user because you are not following this user"})
            }
        }catch(err){
            res.status(500).json(err);
        }
    }
}
