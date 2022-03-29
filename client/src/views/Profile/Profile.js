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

    
    // CHECK IF USER IS LOGGED IN
    const GetToken = async () => {
        try {
            const response = await axios.post("/.netlify/functions/getcookie");
            // console.log({message:"Get cookies response", response:response})
            // console.log(response.data.decodedToken.payload.user_metadata.id)
            // console.log(response.data.decodedToken.payload.user_metadata.username)
            if(response.data.decodedToken == null){
                history.push("/")
            }else{
                const CookieId = response.data.decodedToken.payload.user_metadata.id;
                axios.get(`${process.env.REACT_APP_API_LINK}/api/finduser/${CookieId}`, { withCredentials: true })
                .then(res => {
                    console.log("Your logged in user info", res)
                    // res.data.results will contains the info of the user, 
                    // that has its id in the cookies. if the user logged in, he will have one. 
                    // if not he won't have a cookie therefore no info
                    if (res.data.results === null) {
                        // user have a cookies
                        // setLoggedInUser(res.data.results)
                        history.push("/")
                    }
                    else if (res.data.results){
                        console.log("ok");
                    }
                })
                .catch(err => {
                    console.log("Erorr when getting logged in user", err);
                    history.push("/");
                })
            }
        } catch (err) {
            console.log({err:err});
        }
    }

    useEffect(() => {
        GetToken()
    }, [])
    return(
        <div>
            <ProfilePage params = {params} />
            <Theme/>
        </div>
    )
}

export default Profile;