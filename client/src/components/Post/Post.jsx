import React, { useEffect, useState } from "react";
import "./Post.css";
import { IoMdTrash } from "react-icons/io";



import axios from "axios";
import {format} from "timeago.js";
import { Link } from "react-router-dom";


const Post = ({post}) => {
    // const user = UsersS.filter(u=> u.id === 1)
    // console.log(user[0].username)
    // console.log(post);
    
    // importing the assets file from my evn file. for a react app env need to be in client
    // and we need to add "REACT_APP_"+variable_name for it to work.
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [UserInDB, setUserInDB] = useState({});
    const [LoggedInUser, setLoggedInUser] = useState({});

    // LIKE CONDITIONAL STYLING
    const [liked, setLiked] = useState(false);
    const [likedCount, setLikedCount] = useState(post.likes.length)
    const [bookmarked, setBookmarked] = useState(false);

    // Get all users
    useEffect(() => {
        axios.get(`http://localhost:8000/api/finduser/${post.userId}`)
            .then(res =>{
                console.log({message:"Here is the user in DB", results:res})
                setUserInDB(res.data.results);
            })
            .catch( err => {
                console.log({message:"Error when getting all users in DB", error:err})
            })
    }, [post.userId])

    // GET THE LOGGED IN USER WITH JASONWEBTOKEN
    useEffect(() => {
        axios.get(`http://localhost:8000/api/finduser`, {withCredentials:true})
        .then(res => {
            // console.log("LeftBar: Your logged in user info", res)
            // res.data.results will contains the info of the user, 
            // that has its id in the cookies. if the user logged in, he will have one. 
            // if not he won't have a cookie therefore no info
            if(res.data.results){
                // user have a cookies
                setLoggedInUser(res.data.results)
                console.log("Post: Got logged in user from cookies")
            } 
        })
        .catch(err => {
            console.log("Erorr when getting logged in user", err)
        })

    }, []);

    // LIKED/BOOKEDMARK A POST
    const Cliked = (object) => {
        if(object=="like"){
            // affectting the syling(color red)
            liked? setLiked(false): setLiked(true);

            // affecting the counting
            // Questions why? is liked still false
            setLikedCount(liked? likedCount-1 : likedCount+1)



            // AXIOS CALL ,{_id: LoggedInUser._id}
            axios.put(`http://localhost:8000/api/post/like/${post._id}`, {_id: LoggedInUser._id})
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log({error:err});
                })
        } else if (object="bookmark"){
            // affectting the syling(color Primary color)
            bookmarked? setBookmarked(false): setBookmarked(true);
        }
    }

    // Keep like state(color red or black) if the post has been already liked or disliked
    useEffect(() => {
        setLiked(post.likes.includes(LoggedInUser._id))
    },[post.likes, LoggedInUser._id]);

    // Delete post
    const deletePost = () => {
        axios.delete(`http://localhost:8000/api/delete/post/${post._id}`, {withCredentials:true})
            .then(res => {
                console.log({message:"post deleted successfully", result:res})
                // reloading
                window.location.reload();
            })
            .catch(err => {
                console.log({message:"error when deleting post", error:err})
            })
    }


    return (
        <div>
            {/* ======== Fist post ============= */}
            <div className="post">
                <div className="post-top">
                    <div className="post-profile">
                        <div className="post-profile-pic">
                            <img className="post-profile-pic" src={UserInDB.profilePicture? UserInDB.profilePicture : PUBLIC_FOLDER+"person/default-profile-image.jpeg"} alt="profile profile" />
                        </div>
                        <div className="info">
                            <Link className="Post-Link-Text" to={`/profile/${UserInDB.username}`}><h3>{UserInDB.username}</h3></Link>
                            <small className="text-muted">Dubai,{format(post.createdAt)}</small>
                        </div>
                    </div>
                    {
                        LoggedInUser._id == UserInDB._id? 
                        <span  onClick={deletePost}><IoMdTrash style={{fontSize:'1.4rem', color:'tomato', cursor:'pointer'}}/></span>
                        : <span className="edit" style={{cursor:'pointer'}}><i class="uil uil-ellipsis-h"></i></span> 
                    }
                </div>

                {/* Photo */}
                <div className="post-middle">
                {(post.image)? <img src={post.image} alt="post picture" /> : <span class="text-uil"> {post.description} </span>}
                </div>

                {/* Bottom post */}
                <div className="post-bottom">
                    {/* Action button */}
                    <div className="action-button">
                        <div className="interrection-button">
                            <span onClick={() => Cliked("like")} ><i className={liked? "uil uil-heart uil-active" : "uil uil-heart" } ></i></span>
                            <span ><i className="uil uil-comment-dots"></i></span>
                            <span><i className="uil uil-share-alt"></i></span>
                        </div>
                        <div className="bookmark">
                            <span onClick={() => Cliked("bookmark")}><i class={bookmarked? "uil uil-bookmark bookmark bookmark-active":"uil uil-bookmark bookmark"} ></i></span>
                        </div>
                    </div>
                    <div className="like-by">
                        <span> <img  src="/assets/person/10.jpeg" alt="profile picture" /></span>
                        <span> <img src="/assets/person/1.jpeg" alt="profile picture" /></span>
                        <span> <img src="/assets/person/9.jpeg" alt="profile picture" /></span>
                        <p>Liked by <b>Ernest Achiever</b> and <b>{likedCount} others</b></p>
                    </div>
                    <div className="caption">
                        <p><b>Lana Rose</b> {post.description} <span className="harsh-tag">  </span></p>
                    </div>
                    <div className="comments text-muted"><a href="#">View all {post.comments.length} comments</a></div>
                </div>
            </div>
        </div>
    )
}

export default Post;