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


    const logout = () => {
        axios.get("http://localhost:8000/api/logout", {withCredentials: true})
        .then(res => {
            console.log(res)
            history.push("/")
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/finduser", {withCredentials:true})
            .then(res => {
                // console.log("LeftBar: Your logged in user info", res)
                // res.data.results will contains the info of the user, 
                // that has its id in the cookies. if the user logged in, he will have one. 
                // if not he won't have a cookie therefore no info
                if(res.data.results){
                    // user have a cookies
                    setLoggedInUser(res.data.results)
                    console.log("Navbar: Got logged in user from cookies")
                } 
            })
            .catch(err => {
                history.push("/")
                console.log("Erorr when getting logged in user", err)
            })
    }, [])

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
                                Social Name
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
                                <a href={`/profile/${LoggedInUser.username}`}><img className="profile-pic" src={LoggedInUser.profilePicture? LoggedInUser.profilePicture : PUBLIC_FOLDER+"person/default-profile-image.jpeg"} alt="profile picture" /></a>
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