import React, { useEffect, useState } from "react";
import "./Feed.css";
import Post from "../Post/Post";

import axios from "axios";


const Feed = (props) => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [allPost, setAllpost] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/post/find", {withCredentials:true} )
            .then(res => {
                console.log({message: "All user posts and freind posts", result: res})
                setAllpost(res.data.results);
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

                {/* create post form */}
                <form class="create-post">
                    <div className="profile-pic">
                        <img src={`${PUBLIC_FOLDER}person/1.png`} alt="profile picture" />
                    </div>
                    <input type="text" className="create-post-input" placeholder="what is inside of you mind?" id="post-id"/>
                    <input type="submit"  value="Post" className="btn2 btn-primary" />
                </form>
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