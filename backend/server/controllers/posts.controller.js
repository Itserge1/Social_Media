const post = require("../models/post.model");
const user = require("../models/users.model");
const jwt = require("jsonwebtoken");


// CREATE A POST

module.exports.NewPost = (req, res) => {
    // console.log(req.body);
    post.create(req.body)
        .then(newPost => res.json({ results: newPost }))
        .catch(error => res.status(400).json({ mesage: "That did not work!", error }))
}
// UPDATE A POST
module.exports.UpdatePost = async (req, res) => {
    try {
        // Try this. If you can not fing PostToUpdate, run the code in the catch block
        const PostToUpdate = await post.findById(req.params._id)
        if (req.body.userId === PostToUpdate.userId) {
            post.updateOne({ _id: req.params._id }, req.body, { runValidators: true })
                .then(updatedPost => res.json({ mesage: "Your post have been updated", results: updatedPost }))
                .catch(error => res.status(400).json({ mesage: "That did not work" }, error))
        } else {
            res.status(403).json({ message: "You can only update your post" })
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
// DELETE A POST
module.exports.DeletePost = async (req, res) => {
    try {
        // Try this. If you can not fing PostToUpdate, run the code in the catch block
        const PostToDelete = await post.findById(req.params._id)
        if (req.body.userId === PostToDelete.userId) {
            post.deleteOne({ _id: req.params._id })
                .then(deletedPost => res.json({ mesage: "Your post have been deleted", results: deletedPost }))
                .catch(error => res.status(400).json({ mesage: "That did not work" }, error))
        } else {
            res.status(403).json({ message: "You can only delete your post" })
        }
    } catch (err) {
        res.status(500).json(err);
    }
}
// LIKE AND DISLIKE A POST
module.exports.LikePost = async (req, res) => {
    try {
        // LIKE A POST
        // Getting the current user cookie info
        // const decodedJWT = jwt.decode(req.cookies.usertoken, {complete:true})
        const postToUpdate = await post.findOne({ _id: req.params._id })
        //(Not) If the post already was liked
        // console.log(decodedJWT.payload.id);
        if (!postToUpdate.likes.includes(req.body._id)) {
            await postToUpdate.updateOne({ $push: { likes: req.body._id } })
            res.status(200).json({ message: "The post has been liked" })
        } else {
            // DISLIKE A POST
            await postToUpdate.updateOne({ $pull: { likes: req.body._id } })
            res.status(200).json({ message: "The post has been disliked" })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

// GET A POST
module.exports.GetOnePost = (req, res) => {
    post.findOne({ _id: req.params._id })
        .then(OnePost => res.json({ results: OnePost }))
        .catch(error => res.status(400).json({ message: "That did not work", error }))
}

// GET (ALL) TIMELINE POSTS

module.exports.GetAllPost = async (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete:true})
    // var newid = decodedJWT.payload.id
    // console.log(newid)
    try {
        // Get the current user
        const CurrentUser = await user.findOne({ _id: decodedJWT.payload.id })
        // const CurrentUser = await user.findOne({ _id: req.body._id })
        // Get all the current user post
        const UserPost = await post.find({ userId: CurrentUser._id })
        //  map trought the current user following array to get it's freinds id
        const AllFriendPost = await Promise.all(
            CurrentUser.followings.map((FreindId) => {
                // for each id we want to find a post that have the same userId, Then put all that in AllFriendPost 
                return post.find({ userId: FreindId })
            })
        )
        // Concat both arrays
        res.json({results: UserPost.concat(...AllFriendPost)})
    } catch (error) {
        res.status(500).json({ message: "That did not work", error })
    }
}

// GET (ALL) PROFILE TIMELINE POSTS (FIND BY USERNAME)

module.exports.GetAllProfilePost = async (req, res) => {
    try {
        // Get the current user
        const CurrentUser = await user.findOne({ username: req.params.username})
        // const CurrentUser = await user.findOne({ _id: req.body._id })
        // Get all the current user post
        const UserPost = await post.find({ userId: CurrentUser._id })
        //  map trought the current user following array to get it's freinds id
        const AllFriendPost = await Promise.all(
            CurrentUser.followings.map((FreindId) => {
                // for each id we want to find a post that have the same userId, Then put all that in AllFriendPost 
                return post.find({ userId: FreindId })
            })
        )
        // Concat both arrays
        res.json({results: UserPost.concat(...AllFriendPost)})
    } catch (error) {
        res.status(500).json({ message: "That did not work", error })
    }
}