import React, { useEffect, useState } from "react";
import "./Profile.css"
import ProfilePage from "../../components/ProfilePage/ProfilePage";
import Theme from "../../components/Theme/Theme";
import axios from "axios";
import { useHistory } from "react-router-dom";


const Profile = (props) => {
    const history = useHistory();
    useEffect(() => {
        axios.get("http://localhost:8000/api/finduser", {withCredentials:true})
            .then(res => {
                // console.log("LeftBar: Your logged in user info", res)
                // res.data.results will contains the info of the user, 
                // that has its id in the cookies. if the user logged in, he will have one. 
                // if not he won't have a cookie therefore no info
                if(res.data.results){
                    // user have a cookies
                    // setLoggedInUser(res.data.results)
                    console.log("ok")
                } 
            })
            .catch(err => {
                history.push("/")
                console.log("Erorr when getting logged in user", err)
            })
    }, [])
    return(
        <div>
            <ProfilePage/>
            <Theme/>
        </div>
    )
}

export default Profile;