import React, { useEffect, useState } from "react";
import "./Profile.css"
import ProfilePage from "../../components/ProfilePage/ProfilePage";
import Theme from "../../components/Theme/Theme";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

const Profile = (props) => {
    const history = useHistory();
    const params = useParams();
    // console.log({message:" Here is your Parms", params: params});

    // CHECK IF USER LOGGED IN
    useEffect(() => {
        axios.get("http://localhost:8000/api/finduser", {withCredentials:true})
            .then(res => {
                // console.log("LeftBar: Your logged in user info", res)
                // res.data.results will contains the info of the user, 
                // that has its id in the cookies. if the user logged in, he will have one. 
                // if not he won't have a cookie therefore no info
                if(res.data.results === null){
                    // user have a cookies
                    // setLoggedInUser(res.data.results)
                    history.push("/");;
                }
                if(res.data.results){
                    // user have a cookies
                    // setLoggedInUser(res.data.results)
                    console.log("Profile: User Can access profile page")
                } 
            })
            .catch(err => {
                history.push("/")
                console.log("Erorr when getting logged in user", err)
            })
    }, [])
    return(
        <div>
            <ProfilePage params = {params} />
            <Theme/>
        </div>
    )
}

export default Profile;