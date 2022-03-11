import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "./EditProfilePage.css"
import Crop from "../crop/Crop";

const EditProfilePage = () => {
    const [userForm, setUserForm] = useState({});
    const [LoggedInUser, setLoggedInUser] = useState({});
    const [profilePicFile, setProfilePicFile] = useState(null);
    const coverPicFile = useRef(null);

    const history = useHistory();
    useEffect(() => {
        axios.get("http://localhost:8000/api/finduser", { withCredentials: true })
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
    }, [])

    // USER INFO ONCHAGEHANDLER
    const onChangeHandler = (event) => {
        console.log({ message: "here is your event", event: event })
        setUserForm({
            ...userForm,
            [event.target.name]: event.target.value,
        })
    }

    // USER PROFILE PICTURE ONCHAGEHANDLER
    const onChangeProfilePicHandler = (event) => {
        console.log({ message: "here is your event", event: event })
        setProfilePicFile(event.target.files[0])
        // setPictureForm({
        //     ...pictureForm,
        //     profilePicture: event.target.files[0]
        // })
    }

    // USER COVER PICTURE ONCHANGEHANDLER
    const onChangeCoverPicHandler = (event) => {
        console.log({ message: "here is your event", event: event })
        coverPicFile.current = event.target.files[0];
        // setCoverPicFile(event.target.files[0])
        // setPictureForm({
        //     ...pictureForm,
        //     coverPicture:event.target.files[0]
        // })
    }

    // UPDATING USER INFO
    const UpdateLoggedUserInfo = (event) => {
        event.preventDefault();
        axios.patch("http://localhost:8000/api/update", userForm, { withCredentials: true })
        .then(res => {
            // history.push(`/profile/${LoggedInUser.username}`)
            history.push(`/home`)
            console.log({ message: "User updated", results: res })
        })
        .catch(err => {
            history.push("/edit")
            console.log({ error: "unable to update user", error: err })
        })
    }
    
    // UPDATING USER PROFILE/COVER PICTURE
    const UpdateLoggedUserCoverOrProfilePic = (event) => {
        event.preventDefault();
        // console.log(event);
        if(profilePicFile === null){
            const formData = new FormData();
            console.log(coverPicFile)
            formData.append('file', coverPicFile)
            console.log(formData);
            axios.patch("http://localhost:8000/api/update/coverpicture", formData)
                .then(res => {
                    console.log({message:"Successfully update cover picture" , result:res});
                })
                .catch(err => {
                    console.log({message:"Error when updating cover picture" , error:err})
                })
        } else if (coverPicFile === null){
            axios.patch("http://localhost:8000/api/update/profilepicture", profilePicFile)
                .then(res => {
                    console.log({message:"Successfully update profile picture" , result:res});
                })
                .catch(err => {
                    console.log({message:"Error when updating profile picture" , error:err})
                })
        } else if(profilePicFile=== null && coverPicFile===null){
            history.push("/edit")
        }

    }
    return (
        <div>
            <h1>hello , {LoggedInUser.username}.</h1>
            <a href="/home">Home</a>
            {/* <div className="profile-profile-pic">
                <img src="/assets/post/23.jpg" alt="profile picture" />
            </div> */}
            <div className="editProfilePage-update-container">
                <form onSubmit={UpdateLoggedUserInfo}>
                    <h2>Update user info</h2>
                    <div>
                        <label htmlFor="username">username</label>
                        <input type="text" name="username" placeholder="username" id="username" onChange={onChangeHandler} />
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" placeholder="Description" id="description" onChange={onChangeHandler} />
                    </div>

                    <div>
                        <label htmlFor="city">City</label>
                        <input type="text" name="city" placeholder="city" id="city" onChange={onChangeHandler} />
                    </div>

                    <div>
                        <label htmlFor="from">From</label>
                        <input type="text" name="from" placeholder="from" id="from" onChange={onChangeHandler} />
                    </div>

                    <div>
                        <label htmlFor="relationship">Relationship Satue</label>
                        <select name="relationship" id="relationship" onChange={onChangeHandler}>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Complicated">Complicated</option>
                        </select>
                    </div>
                    <button type="submit" >Update</button>
                </form>
                
                {/* UPDATE PROFILE PICTURE */}
                <form onSubmit={UpdateLoggedUserCoverOrProfilePic} >
                    <h2>Update Profile picture</h2>
                    <div>
                        <label htmlFor="profilePicture">profile Picture</label>
                        <input type="file" name="profilePicture" placeholder="profile Picture" id="profilePicture" onChange={onChangeProfilePicHandler} />
                    </div>
                    <button type="submit">Update profile Picture</button>
                </form>

                {/* UPDATE COVER PICTURE */}
                <form onSubmit={UpdateLoggedUserCoverOrProfilePic}>
                    <h2>Update Cover Picture</h2>
                    <div>
                        <label htmlFor="coverPicture">cover Picture</label>
                        <input type="file" name="coverPicture" placeholder="cover Picture" id="coverPicture"  onChange={onChangeCoverPicHandler}/>
                    </div>
                    <button type="submit">Update Cover Picture</button>
                </form>
            </div>
            {/* <Crop/> */}
        </div>
    )
}

export default EditProfilePage;