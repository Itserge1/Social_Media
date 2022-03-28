import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import "./Navbar.css";
import axios from 'axios';
import { Link } from "react-router-dom";

const Navbar = (props) => {

    const history = useHistory();
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [LoggedInUser, setLoggedInUser] = useState({});
    const [text, setText] = useState({});


    // GETTING THE LOGGEDINUSER FROM COOKIES
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
    
    // LOGOUT 
    const logout = async () => {
        // CLEARING COOKIES: USING NETLIFY SERVERLESS FUNCTION
        const response = await axios.post("/.netlify/functions/clearcookie");
        console.log({message:"Cookie clear", response:response})
        // REDIRECT TO "/"
        history.push("/")
    }

    const OnChangeHandler = (event) => {
        setText(event.target.value);
    }

        // Find user
    const GetUser = async () => {
        history.push(`/profile/${text}`)
        // console.log(text)
        // const result = await axios.get(`http://localhost:8000/api/finduser/username/${text}`)
        // console.log({message:"here is result", result:result})
        // if(result){
        //     history.push(`/profile/${text}`)
        // }else{
        //     history.push("/error")
        // }

    }

    return(
        <div>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Nav bar</title>
                <link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.6/css/unicons.css"></link>
                <link rel="stylesheet" href="./Navbar.css" />
            </head>
            <body>
                <nav>
                    <div className="navbar">
                        <Link to="/home" className="link-clean-text">
                            <h2 class="log">
                                Dojo Media
                            </h2>
                        </Link>
                        <form onSubmit={GetUser}>
                            <div className="search_bar">
                                <i class="uil uil-search"></i>
                                <input type="search" placeholder="search" onChange={OnChangeHandler}/>
                            </div>
                        </form>
                        <div className="nav-left">
                            <input id="marginBottom" className="btn btn-primary" type="button" value="Logout" onClick={logout}/>
                            <div className="profile-pic">
                                <Link to={`/profile/${LoggedInUser.username}`} >
                                    <a><img className="profile-pic" src={LoggedInUser.profilePicture? LoggedInUser.profilePicture : "https://res.cloudinary.com/dvocilaus/image/upload/v1648492523/my-social-media-uploads/anwlelkpndjrwvkdncor.jpg"} alt="profile picture" /></a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </body>
            </html>
        </div>
    )
}

export default Navbar;