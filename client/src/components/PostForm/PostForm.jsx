import React, { useEffect, useState } from "react";
import "./PostForm.css"

import axios from "axios";
import { useHistory } from "react-router";

const PostForm = () => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [LoggedInUser, setLoggedInUser] = useState ({});
    

    const[form, setForm] = useState({
        userId:"",
        // userId:"620ae28ab23cc7e406a4e017",
        description:"",
        image:"",
    });

    const history = useHistory();
    

    // GET THE LOGGED IN USER WITH JASONWEBTOKEN
    useEffect(() => {
        axios.get(`http://localhost:8000/api/finduser`, {withCredentials:true})
        .then(res => {
            // console.log("LeftBar: Your logged in user info", res)
            // res.data.results will contains the info of the user, 
            // that has its id in the cookies. if the user logged in, he will have one. 
            // if not he won't have a cookie therefore no info
            if(res.data.results){
                // user have a cookies
                setLoggedInUser(res.data.results);
                console.log("PostForm: Got logged in user from cookies")
            } 
        })
        .catch(err => {
            console.log("Erorr when getting logged in user", err)
        })

    }, []);

    // FORM ONCHANGE HANDLER
    const onChangeHandler = (event) => {
        setForm({
            ...form,
            userId: LoggedInUser._id,
            [event.target.name]: event.target.value,
        });
    }

    // Make a post
    const makeApost =  (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/newpost", form, {withCredentials:true})
            .then(res => {
                // console.log(res);
                window.location.reload() // this code refresh the page after a post
            })
            .catch(err => {
                console.log({message:"Here is your err", err:err});
            })
        
    }
    return (
        <div>
            {/* create post form */}
            <form className="feed-post-form" onSubmit={makeApost}>
                <div className="create-post">
                    <div className="profile-pic">
                        <img className="profile-pic" src={LoggedInUser.profilePicture ? PUBLIC_FOLDER + LoggedInUser.profilePicture : `${PUBLIC_FOLDER}person/default-profile-image.jpeg`} alt="profile picture" />
                    </div>
                    <input type="text" className="create-post-input" placeholder="what is inside of you mind?" id="post-id" name="description" onChange={onChangeHandler} />
                    {/* <input type="hidden"  value={LoggedInUser._id}  name="userId"/> */}
                    <input type="submit" value="Post" className="btn2 btn-primary" />
                    {/* <button type="submit"  className="btn2 btn-primary">Post</button> */}
                </div>
                <div className="feed-files">
                    <span className="feed-files-icons">
                        <i className="uil uil-image-plus" id="orange"></i>
                        <label className="feed-files-icons" htmlFor="image">Photos/Videos </label>
                        <input style={{ display: "none" }} type="file" accept=".png,.jpeg,.jpg" id="image" name="image" onChange={onChangeHandler} />
                    </span>
                    <span className="feed-files-icons"><i className="uil uil-tag-alt" id="blue"></i>Tag</span>
                    <span className="feed-files-icons"><i className="uil uil-location-point" id="green"></i>Location</span>
                    <span className="feed-files-icons"><i className="uil uil-grin" id="yellow"></i>Fellings</span>
                </div>
            </form>

        </div>
    )
}

export default PostForm;