import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Leftbar from "../Leftbar/Leftbar";
import ProfileFeed from "../../components/ProfileFeed/ProfileFeed";
import "./ProfilePage.css";

import axios from "axios";
import { useHistory } from "react-router-dom";






const ProfilePage = (props) => {
    const [userByUsername, setuserByUsername] = useState({})
    const history = useHistory();

    // GET USER BASED ON PARAMS
    useEffect(() => {
        axios.get(`http://localhost:8000/api/finduser/username/${props.params.username}`, { withCredentials: true })
            .then(res => {
                // console.log("LeftBar: Your logged in user info", res)
                // res.data.results will contains the info of the user, 
                // that has its id in the cookies. if the user logged in, he will have one. 
                // if not he won't have a cookie therefore no info
                if (res.data.results === null) {
                    // send to error page
                    // console.log({message:"error getting param user ", res:res});
                    history.push("/error")
                } else if (res.data.results) {
                    // console.log({message:"Got param user ", res:res});
                    setuserByUsername(res.data.results);
                }
            })
            .catch(err => {
                history.push("/error")
                // display user not found
                console.log("Erorr when getting logged in user", err)
            })
    }, [props.params.username]);
    
    return (
        <div>
            <div className="profile-topbar">
                <Navbar />
            </div>
            <main >
                <div className="profile-container">
                    <div className="left">
                        <Leftbar />
                    </div>
                    <div className="profile-feed">
                        <ProfileFeed username={props.params.username} userByUsername={userByUsername}/>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ProfilePage;