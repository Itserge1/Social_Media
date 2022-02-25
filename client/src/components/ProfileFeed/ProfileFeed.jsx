import React, { useEffect, useState } from "react";
import "./ProfileFeed.css";

import axios from "axios";
import { useHistory } from "react-router-dom";

import Post from "../Post/Post";
import ErrorPage from "../ErrorPage/ErrorPage";



const ProfileFeed = (props) => {
    const history = useHistory();
    const [User, setUser] = useState({});
    const [LoggedInUser, setLoggedInUser] = useState({});
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [allPost, setAllpost] = useState([]);

    useEffect(() => {
        // GET USER BY USERNAME 
        axios.get(`http://localhost:8000/api/finduser/username/${props.username}`, {withCredentials:true})
        .then(res => {
            // console.log("LeftBar: Your logged in user info", res)
            // res.data.results will contains the info of the user, 
            // that has its id in the cookies. if the user logged in, he will have one. 
            // if not he won't have a cookie therefore no info
            if(res.data.results === null){
                // send to error page
                history.push("/error")
            } else if(res.data.results){
                // user have a cookies
                setUser(res.data.results)
                console.log("ok")
            } 
        })
        .catch(err => {
            history.push("/error")
            // display user not found
            console.log("Erorr when getting logged in user", err)
        })

        // GET THE LOGGED IN USER WITH JASONWEBTOKEN
        axios.get(`http://localhost:8000/api/finduser`, {withCredentials:true})
        .then(res => {
            // console.log("LeftBar: Your logged in user info", res)
            // res.data.results will contains the info of the user, 
            // that has its id in the cookies. if the user logged in, he will have one. 
            // if not he won't have a cookie therefore no info
            if(res.data.results){
                // user have a cookies
                setLoggedInUser(res.data.results)
                console.log("ok")
            } 
        })
        .catch(err => {
            history.push("/error")
            console.log("Erorr when getting logged in user", err)
        })

        // (props.username)
        // ? axios.get("http://localhost:8000/api/finduser/username/:username", {withCredentials:true})
        // .then(res => {
        //     // console.log("LeftBar: Your logged in user info", res)
        //     // res.data.results will contains the info of the user, 
        //     // that has its id in the cookies. if the user logged in, he will have one. 
        //     // if not he won't have a cookie therefore no info
        //     if(res.data.results){
        //         // user have a cookies
        //         setUser(res.data.results)
        //         console.log("ok")
        //     } 
        // })
        // .catch(err => {
        //     history.push("/")
        //     console.log("Erorr when getting logged in user", err)
        // }) :
        // axios.get("http://localhost:8000/api/finduser", {withCredentials:true})
        //     .then(res => {
        //         // console.log("LeftBar: Your logged in user info", res)
        //         // res.data.results will contains the info of the user, 
        //         // that has its id in the cookies. if the user logged in, he will have one. 
        //         // if not he won't have a cookie therefore no info
        //         if(res.data.results){
        //             // user have a cookies
        //             setUser(res.data.results)
        //             console.log("ok")
        //         } 
        //     })
        //     .catch(err => {
        //         history.push("/")
        //         console.log("Erorr when getting logged in user", err)
        //     });
    }, [])


    useEffect(() => {
        axios.get(`http://localhost:8000/api/post/find/${props.username}`, {withCredentials:true} )
            .then(res => {
                console.log({message: "All user posts and freind posts base on username", result: res})
                setAllpost(res.data.results);
            })
            .catch(err => {
                console.log({message:"Error when getting user posts and freind posts ", error: err})
            })
        // (props.username)?
        // axios.get(`http://localhost:8000/api/post/find/${props.username}`, {withCredentials:true} )
        //     .then(res => {
        //         console.log({message: "All user posts and freind posts base on username", result: res})
        //         setAllpost(res.data.results);
        //     })
        //     .catch(err => {
        //         console.log({message:"Error when getting user posts and freind posts ", error: err})
        //     }) :
        // axios.get("http://localhost:8000/api/post/find", {withCredentials:true} )
        //     .then(res => {
        //         console.log({message: "All user posts and freind posts", result: res})
        //         setAllpost(res.data.results);
        //     })
        //     .catch(err => {
        //         console.log({message:"Error when getting user posts and freind posts ", error: err})
        //     })

    }, []);
    return (
        <div>
            {/* =========== TOP FEED =============== */}
            <div className="profileTopFeed">
                <img src= { ( User.coverPicture)? PUBLIC_FOLDER+User.coverPicture : PUBLIC_FOLDER+"person/default-cover-image.jpeg"} alt="cover pic" />
                <div className="profile-profile-pic">
                    <img src={(User.profilePicture)? PUBLIC_FOLDER+User.profilePicture  : PUBLIC_FOLDER+"person/default-profile-image.jpeg"} alt="profile pic" />
                </div>
                <div className="profile-profile-name">
                <h1>{User.username}</h1>
                    <p>{User.description}</p>
                </div>
            </div>
            {/* ================ FEED POST =================== */}
            <div className="profile-bottoms">
                {/* create post form */}
                <div className="feed-post">
                    <form class="create-post">
                        <div className="profile-pic">
                            <img className="profile-pic" src={(LoggedInUser.profilePicture)? PUBLIC_FOLDER+LoggedInUser.profilePicture  : PUBLIC_FOLDER+"person/default-profile-image.jpeg"} alt="profile picture" />
                        </div>
                        <input type="text" className="create-post-input" placeholder="what is inside of you mind?" id="post-id" />
                        <input type="submit" value="Post" className="btn2 btn-primary" />
                    </form>
                    {allPost.map(p => (
                        <Post key={p._id} post={p} />
                    ))}
                </div>
                {/* ===================== Profile Info ======================= */}
                <div className="profile-friend">
                    {/* add freinds */}
                    <div className="profile-user-info">
                        <h3>User Information</h3>
                        <p><b>City: </b> <span className="text-muted"> {User.city}</span> </p>
                        <p><b>From: </b> <span className="text-muted"> {User.from} </span></p>
                        <p><b>Relationship: </b>  <span className="text-muted"> {User.relationship}</span></p>
                    </div>
                    <div className="user-freind-general">
                        <h3>User Freinds</h3>
                        <div className="profile-user-profiles">
                            {/* ============= ONE FIREND ================= */}
                            <div className="profile-user-profile">
                                <div className="profile-user-profile-pic">
                                    <img src="/assets/person/6.jpeg" alt="" />
                                </div>
                                <h4>John Carter</h4>
                            </div>
                            {/* ============= ONE FIREND ================= */}
                            <div className="profile-user-profile">
                                <div className="profile-user-profile-pic">
                                    <img src="/assets/person/6.jpeg" alt="" />
                                </div>
                                <h4>John Carter</h4>
                            </div>
                            {/* ============= ONE FIREND ================= */}
                            <div className="profile-user-profile">
                                <div className="profile-user-profile-pic">
                                    <img src="/assets/person/6.jpeg" alt="" />
                                </div>
                                <h4>John Carter</h4>
                            </div>
                            {/* ============= ONE FIREND ================= */}
                            <div className="profile-user-profile">
                                <div className="profile-user-profile-pic">
                                    <img src="/assets/person/1.jpeg" alt="" />
                                </div>
                                <h4>John Carter</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileFeed;