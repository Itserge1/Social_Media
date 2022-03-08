const user = require("../models/users.model")
const jwt = require("jsonwebtoken")
const { findOne } = require("../models/users.model")

// The decode function help use get all the info we stored in or cookies.
// const decodedJWT = jwt.decode(req.cookies.usertoken, {complete:true}) // {complete:true} get the complete data.
// we will use 'decodedJWT.payload.id' soon to get the id. (it work alson for any info we store in the cookie)

// UPDATE USER
module.exports.UpdateUser = (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true })
    // var newid = decodedJWT.payload.id
    // console.log(newid)
    user.updateOne({ _id: decodedJWT.payload.id }, req.body, { runValidators: true })
        .then(updateUser => res.json({ results: updateUser }))
        .catch(error => res.status(400).json({ message: "That did not work!!!" }, error))
}

module.exports.DeleteUser = (req, res) => {
    // Getting the current user cookie info
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true })
    user.deleteOne({ _id: decodedJWT.payload.id })
        .then(DeleteUser => res.json({ results: DeleteUser }))
        .catch(error => res.status(400).json({ message: "That did not work!!" }, error))
}
// GET LOGGED IN USER
module.exports.GetLoggedInUser = (req, res) => {
    // Getting the current user cookie info
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true })
    user.findOne({ _id: decodedJWT.payload.id })
        .then(OneUser => res.json({ results: OneUser }))
        .catch(error => res.status(400).json({ message: "That did not work!!!" }, error))
}
// GET ALL USERS
module.exports.FindAllUser = (req, res) => {
    user.find({})
        .then(AllUser => res.json({ results: AllUser }))
        .catch(error => res.status(400).json({ message: "That did not work!!!" }, error))
}

// GET ONE USER BY USERNAME
module.exports.GetOneUserByUsername = (req, res) => {
    user.findOne({ username: req.params.username })
        .then(OneUser => res.json({ results: OneUser }))
        .catch(error => res.status(400).json({ message: "That did not work!!!" }, error))
}

// GET ONE USER
module.exports.GetOneUser = (req, res) => {
    user.findOne({ _id: req.params._id })
        .then(OneUser => res.json({ results: OneUser }))
        .catch(error => res.status(400).json({ message: "That did not work!!!" }, error))
}

// GET USER FRIENDS(FOLLOWING) LIST

module.exports.GetUserFriends = async (req, res) => {
    try {
        // getting the curent user
        const User =  await user.findOne({ _id: req.params._id })
        // getting the user's friend list
        const friends = await Promise.all(
            User.followings.map((friendId) => {
                return user.findOne({_id: friendId})
            })
        );
        // let friendList =[];
        // friends.map((friend)=>{
        //     const {_id, username, profilePicture} = friend;
        //     friendList.push({_id, username, profilePicture});
        // });
        // res.status(200).json(friendList)
        res.status(200).json(friends)
    } catch (err) {
        res.status(500).json(err);
    }
}

// FOLLOW A USER
module.exports.FollowUser = async (req, res) => {
    if (req.body._id === req.params._id) {
        // it means that the are the same person
        res.status(403).json({ message: "You can not follow yourself" })
    } else {
        // it means that the are not the same person
        try {
            // find the desire follow user
            const useR = await user.findOne({ _id: req.params._id })
            // find the user currently trying to follow someone
            const CurrentUseR = await user.findOne({ _id: req.body._id })
            //  (NOT)if the user A who want to follow the user B, already have B in his following? 
            if (!useR.followers.includes(req.body._id)) {
                // Adding B to A following.
                await CurrentUseR.updateOne({ $push: { followings: req.params._id } })
                // Adding A to B followers.
                await useR.updateOne({ $push: { followers: req.body._id } })
                res.status(200).json({ message: "User has been followed" })
            } else {
                // Allreading following B
                res.status(403).json({ message: "You are already following this user" })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

// UNFOLLOW A USER

module.exports.UnFollowUser = async (req, res) => {
    if (req.body._id === req.param._id) {
        // it means that the are the same person
        res.status(403).json({ message: "You can not unfollow yourself" })
    } else {
        // it means that the are not the same person
        try {
            // find the user that is going to be unfollow
            const useR = await user.findOne({ _id: req.params._id })
            // find the user currently trying to unfollow 
            const CurrentUseR = await user.findOne({ _id: req.body._id })
            //  (NOT)if the user A who want to ufollow the user B, already have B in his following? 
            if (useR.followers.includes(req.body._id)) {
                // A is currentlly following B, so A can unfollow B
                // Removing B from A following.
                await CurrentUseR.updateOne({ $pull: { followings: req.params._id } })
                // Removing A from B followers.
                await useR.updateOne({ $pull: { followers: req.body._id } })
                res.status(200).json({ message: "User has been unfollowed" })
            } else {
                // not following B, so A can not unfollow B
                res.status(403).json({ message: "You can not unfollow this user because you are not following this user" })
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }
}

module.exports.CheckFollowUser = async (req, res) => {
    const User = await user.findOne({_id: req.params._id})
    const LoggedInUser = await user.findOne({_id: req.body._id})
    try{
        if(LoggedInUser.followings.includes(User._id)) {
            res.status(200).json({message:"User has been already followed", isValidFollow:true}); 
        }
        else{
            res.status(200).json({message:"User has NOT been followed yet", isValidFollow: false});
        }
    } catch (err){
        res.status(500).json(err);
    }
}
