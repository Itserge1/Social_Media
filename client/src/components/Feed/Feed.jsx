import React, { useEffect, useState } from "react";
import "./Feed.css";
import Post from "../Post/Post";
import PostForm from "../PostForm/PostForm";

import axios from "axios";
import { useHistory } from "react-router";


const Feed = (props) => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [allPost, setAllpost] = useState([]);

    // GET ALL USER AND USER'S FREINDS POST

    useEffect(() => {
        axios.get("http://localhost:8000/api/post/find", {withCredentials:true} )
            .then(res => {
                console.log({message: "All user posts and freind posts", result: res})
                // setAllpost(res.data.results) // all post
                setAllpost(res.data.results.sort((p1,p2) =>{
                    return new Date(p2.createdAt) - new Date(p1.createdAt); //sorting all post by most recent
                }));
            })
            .catch(err => {
                console.log({message:"Error when getting user posts and freind posts ", error: err})
            })

    }, []);

    
    return (
        <div>
            {/* =========== TOP FEED =============== */}
            <div className="top-feed">
                <div className="stories">
                    <div className="story">
                        <div className="profile-pic">
                            <img src={`${PUBLIC_FOLDER}person/2.png`} alt="profile photo" />
                        </div>
                        <p className="name">Jhenne Dilan</p>
                    </div>

                    <div className="story">
                        <div className="profile-pic">
                            <img src={`${PUBLIC_FOLDER}person/3.png`} alt="profile photo" />
                        </div>
                        <p className="name">Jhenne Dilan</p>
                    </div>

                    <div className="story">
                        <div className="profile-pic">
                            <img src={`${PUBLIC_FOLDER}person/4.png`} alt="profile photo" />
                        </div>
                        <p className="name">Jhenne Dilan</p>
                    </div>

                    <div className="story">
                        <div className="profile-pic">
                            <img src={`${PUBLIC_FOLDER}person/5.png`} alt="profile photo" />
                        </div>
                        <p className="name">Jhenne Dilan</p>
                    </div>
                </div>

                {/* create post form
                <form className="feed-post-form" onSubmit={makeApost}>
                    <div className="create-post">
                        <div className="profile-pic">
                            <img className="profile-pic" src={LoggedInUser.profilePicture? PUBLIC_FOLDER+LoggedInUser.profilePicture:`${PUBLIC_FOLDER}person/default-profile-image.jpeg`} alt="profile picture" />
                        </div>
                        <input type="text" className="create-post-input" placeholder="what is inside of you mind?" id="post-id" name="description" onChange={onChangeHandler}/>
                        <input type="submit"  value="Post" className="btn2 btn-primary" />
                    </div>
                    <div className="feed-files">
                        <span className="feed-files-icons">
                            <i className="uil uil-image-plus" id="orange"></i>
                            <label className="feed-files-icons" htmlFor="image">Photos/Videos</label>
                            <input style={{display:"none"}} type="file" accept=".png,.jpeg,.jpg" id="image" name="image" onChange={onChangeHandler}/>
                        </span>
                        <span  className="feed-files-icons"><i className="uil uil-tag-alt" id="blue"></i>Tag</span>
                        <span  className="feed-files-icons"><i className="uil uil-location-point" id="green"></i>Location</span>
                        <span  className="feed-files-icons"><i className="uil uil-grin" id="yellow"></i>Fellings</span>

                    </div>
                </form> */}
                <PostForm/>
            </div>
            {/* ================ FEED POST =================== */}
            <div className="feed-post">
                {/* ======== Fist post =============*/}
                {/* {PostsS.map(p => (
                        <Post key={p.id} post={p} />
                    ))} */}
                {allPost.map(p => (
                        <Post key={p._id} post={p} />
                    ))}
            </div>
        </div>
    )
}

export default Feed;