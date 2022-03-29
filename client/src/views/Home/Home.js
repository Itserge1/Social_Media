import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Leftbar from "../../components/Leftbar/Leftbar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import NotificationsPop from "../../components/NotificationsPop/NotificationsPop";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Home = (props) => {
    const history = useHistory()

    // GETTING THE LOGGEDINUSER FROM COOKIES
    const GetToken = async () => {
        try {
            const response = await axios.post("/.netlify/functions/getcookie");
            // console.log({message:"Get cookies response", response:response})
            // console.log(response.data.decodedToken.payload.user_metadata.id)
            // console.log(response.data.decodedToken.payload.user_metadata.username)
            if (response.data.decodedToken == null){
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
            <div className="topbar">
                <Navbar/>
            </div>
            <main >
                <div className="container">
                    <div className="left">
                        <Leftbar/>
                        <NotificationsPop/>
                    </div>
                    
                    <div className="feed">
                        <Feed/>
                    </div>
                    
                    <div  className="right">
                        <Rightbar/>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home;