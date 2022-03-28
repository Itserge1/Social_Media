import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import "./ProfileFeed.css";
import axios from "axios";

import Post from "../Post/Post";
import PostForm from "../PostForm/PostForm";



const ProfileFeed = (props) => {
    const history = useHistory();
    const [User, setUser] = useState({});
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [OnlyUserpost, setOnlyUserpost] = useState([]);
    const [allFriend, setAllFriend] = useState([]);
    const [LoggedInUser, setLoggedInUser] = useState ({});
    const [isValidFollow, setIsValidFollow] = useState(true);


    // GET USER BY USERNAME 
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}/api/finduser/username/${props.username}`, { withCredentials: true })
            .then(res => {
                // console.log("LeftBar: Your logged in user info", res)
                // res.data.results will contains the info of the user, 
                // that has its id in the cookies. if the user logged in, he will have one. 
                // if not he won't have a cookie therefore no info
                if (res.data.results === null) {
                    // send to error page
                    history.push("/error")
                } else if (res.data.results) {
                    // user have a cookies
                    setUser(res.data.results);
                    // console.log({message:"user by username", user:res.data.results, userFreinds:res.data.results.followings})
                }
            })
            .catch(err => {
                history.push("/error")
                // display user not found
                console.log("Erorr when getting logged in user", err)
            })
    }, [props.username]);

    // FIND ONLY  USER'S  POST
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}/api/post/find/onlyuser/${props.username}`, { withCredentials: true })
            .then(res => {
                console.log({ message: "All user posts and freind posts base on username", result: res })
                // setAllpost(res.data.results);
                setOnlyUserpost(res.data.results.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt); //sorting all post by most recent
                }));
                
            })
            .catch(err => {
                console.log({ message: "Error when getting user posts and freind posts ", error: err })
            })
    }, [props.username]);

    // GET USER'S FRIENDS

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_LINK}/api/finduser/friends/${props.userByUsername._id}`)
            .then(res => {
                setAllFriend(res.data);
                // console.log({message:"here is all user's freinds", friends:res});
            })
            .catch(err => {
                console.log({message:"Failed to find all user's freinds", error:err});
            })

    }, [props.userByUsername._id])

    // GET THE LOGGED IN USER WITH JASONWEBTOKEN
    const GetToken = async () => {
        try {
            const response = await axios.post("/.netlify/functions/getcookie");
            // console.log({message:"Get cookies response", response:response})
            // console.log(response.data.decodedToken.payload.user_metadata.id)
            // console.log(response.data.decodedToken.payload.user_metadata.username)
            const CookieId = response.data.decodedToken.payload.user_metadata.id;

            axios.get(`${process.env.REACT_APP_API_LINK}/api/finduser/${CookieId}`, { withCredentials: true })
            .then(res => {
                console.log("Your logged in user info", res)
                // res.data.results will contains the info of the user, 
                // that has its id in the cookies. if the user logged in, he will have one. 
                // if not he won't have a cookie therefore no info
                if (res.data.results) {
                    // user have a cookies
                    setLoggedInUser(res.data.results)
                    console.log("ok");
                }
            })
            .catch(err => {
                console.log("Erorr when getting logged in user", err);
                history.push("/");
            })
            
            // history.push("/edit")
        } catch (err) {
            console.log({err:err});
        }
    }

    useEffect(() => {
        GetToken()
    }, [])

    // Check if user follow or not

    // const CheckIfFollow = () => {
    //     if(LoggedInUser.followings.includes(User._id)) {
    //         setIsValidFollow(true); 
    //     }
    //     else{
    //         setIsValidFollow(false);
    //     }
    // }


    // FOLLOW OR UNFOLLOW USER
    const FollowUser = () => {
        // Then Follow user
        axios.put(`${process.env.REACT_APP_API_LINK}/api/follow/${User._id}`, {_id: LoggedInUser._id})
        .then( res => {
            console.log({message: "User follow successfully", result:res});
            setIsValidFollow(true);
            // window.location.reload();
            // You need to update your state to reflect your database. since you are rendering live.
            const copyLoggedUser = {...LoggedInUser};
            copyLoggedUser.followings.push(User._id);
            setLoggedInUser(copyLoggedUser);
        })
        .catch(err => {
            console.log({message:"Error when following user", error: err})
        })
    }

    const UnfollowUser = () => {
        // Then Unfollow user
        axios.put(`${process.env.REACT_APP_API_LINK}/api/unfollow/${User._id}`, {_id: LoggedInUser._id})
        .then(res => {
            console.log({message:"User unfollow successfully",result: res})
            setIsValidFollow(false);
            // window.location.reload();
        })
        .catch(err => {
            console.log({message:"error when unfollowing user", error:err})
        })
    }


    return (
        <div>
            {/* =========== TOP FEED =============== */}
            <div className="profileTopFeed">
                <img src={(User.coverPicture) ? User.coverPicture : "https://res.cloudinary.com/dvocilaus/image/upload/v1648492534/my-social-media-uploads/z9h8mhzmi9q2phxv79bn.jpg"} alt="cover pic" />
                <div className="profile-profile-pic">
                    <img src={(User.profilePicture) ? User.profilePicture : "https://res.cloudinary.com/dvocilaus/image/upload/v1648492523/my-social-media-uploads/anwlelkpndjrwvkdncor.jpg"} alt="profile pic" />
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
                    {User.username === LoggedInUser.username && <PostForm />}
                    {OnlyUserpost.map(p => (
                        <Post key={p._id} post={p} />
                    ))}
                </div>
                {/* ===================== Profile Info ======================= */}
                <div className="profile-friend">
                    {/* add freinds */}
                    {
                        isValidFollow && LoggedInUser.followings  && LoggedInUser.followings.includes(User._id)? 
                        User.username !== LoggedInUser.username && <span className="follow-unfollow-span" onClick={UnfollowUser}><button className="profile-button">Unfollow</button></span> 
                        : User.username !== LoggedInUser.username && <span className="follow-unfollow-span" onClick={FollowUser}><button className="profile-button">Follow</button></span>
                    }
                    
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
                            { allFriend.map(friend => (
                                <div className="profile-user-profile">
                                    <Link to={`/profile/${friend.username}`} >
                                        <a className="profile-Link-Text">
                                            <div className="profile-user-profile-pic">
                                                <img src={friend.profilePicture? friend.profilePicture : PUBLIC_FOLDER+"person/default-profile-image.jpeg"} alt="" />
                                            </div>
                                            <h4>{friend.username}</h4>
                                        </a>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileFeed;