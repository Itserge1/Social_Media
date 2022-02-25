import React, { useEffect, useState } from "react";
import "./Post.css";

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

    return (
        <div>
            {/* ======== Fist post ============= */}
            <div className="post">
                <div className="post-top">
                    <div className="post-profile">
                        <div className="post-profile-pic">
                            <img src={UserInDB.profilePicture || PUBLIC_FOLDER+"person/default-profile-image.jpeg"} alt="profile profile" />
                        </div>
                        <div className="info">
                            <Link className="Post-Link-Text" to={`/profile/${UserInDB.username}`}><h3>{UserInDB.username}</h3></Link>
                            <small className="text-muted">Dubai,{format(post.createdAt)}</small>
                        </div>
                    </div>
                    <span className="edit"><i class="uil uil-ellipsis-h"></i></span>
                </div>

                {/* Photo */}
                <div className="post-middle">
                {(post.image)? <img src={PUBLIC_FOLDER+post.image} alt="post picture" /> : <span class="text-uil"> {post.description} </span>}
                </div>

                {/* Bottom post */}
                <div className="post-bottom">
                    {/* Action button */}
                    <div className="action-button">
                        <div className="interrection-button">
                            <span><i class="uil uil-heart"></i></span>
                            <span><i class="uil uil-comment-dots"></i></span>
                            <span><i class="uil uil-share-alt"></i></span>
                        </div>
                        <div className="bookmark">
                            <span><i class="uil uil-bookmark bookmark"></i></span>
                        </div>
                    </div>
                    <div className="like-by">
                        <span> <img src="/assets/person/10.jpeg" alt="profile picture" /></span>
                        <span> <img src="/assets/person/1.jpeg" alt="profile picture" /></span>
                        <span> <img src="/assets/person/9.jpeg" alt="profile picture" /></span>
                        <p>Liked by <b>Ernest Achiever</b> and <b>{post.likes.length} others</b></p>
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