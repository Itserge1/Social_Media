import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { IoMdPhotos } from "react-icons/io";
import { IoMdContrast } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import "./EditProfilePage.css"

const EditProfilePage = () => {
    const [userForm, setUserForm] = useState({});
    const [LoggedInUser, setLoggedInUser] = useState({});
    const [profilePicFile, setProfilePicFile] = useState(null);
    const [coverPicFile, setCoverPicFile] = useState(null);

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
        setCoverPicFile(event.target.files[0])
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
    const UpdateLoggedUserCoverOrProfilePic = async (event) => {
        event.preventDefault();
        // console.log(event);
        if (profilePicFile === null) {
            // Checking selected file
            console.log({ message: "here is cover pic", coverPicFile: coverPicFile })
            console.log({ message: "here is profile pic", profilePicFile: profilePicFile })

            // Creating a new forData for our file
            const formData = new FormData();
            formData.append('file', coverPicFile)
            formData.append('upload_preset', 'my-social-media-uploads')
            // console.log(formData);

            // Uplooading the image to cloudinary (cloud)
            console.log(process.env.REACT_APP_CLOUDINARY_COULD_NAME)
            const result = await axios.post(`https://api.cloudinary.com/v1_1/dvocilaus/image/upload`, formData)
            // console.log({message:'here is result', result:result})

            // creating the new object
            const newObject = {
                coverPicture: result.data.secure_url,
                cloudinary_coverPicture_id: result.data.public_id,
            }
            // console.log({message:"new object", newObject:newObject})

            // Upadting our cover picture in MongoDB
            axios.patch("http://localhost:8000/api/update/coverpicture", newObject, { withCredentials: true })
                .then(res => {
                    console.log({ message: "Successfully update cover picture", result: res });
                    history.push("/home");
                })
                .catch(err => {
                    console.log({ message: "Error when updating cover picture", error: err })
                })
        } else if (coverPicFile === null) {
            // Creating a new formData
            const formData = new FormData();
            formData.append('file', profilePicFile)
            formData.append('upload_preset', 'my-social-media-uploads')

            // Uploading to cloudinary (cloud)
            // console.log(process.env.REACT_APP_CLOUDINARY_COULD_NAME)
            const result = await axios.post(`https://api.cloudinary.com/v1_1/dvocilaus/image/upload`, formData)

            // Creating a new object
            const newObject = {
                profilePicture: result.data.secure_url,
                cloudinary_profilePicture_id: result.data.public_id,
            };
            // console.log({message:"new object", newObject:newObject})

            // Updating user profile pic in MongoDB
            axios.patch("http://localhost:8000/api/update/profilepicture", newObject, { withCredentials: true })
                .then(res => {
                    console.log({ message: "Successfully update profile picture", result: res });
                    history.push("/home")
                })
                .catch(err => {
                    console.log({ message: "Error when updating profile picture", error: err })
                })
        } else if (profilePicFile === null && coverPicFile === null) {
            history.push("/edit")
        }

    }

    // theme display
    const OpenThemModel = () => {
        const themeModel = document.querySelector(".customize-theme")
        themeModel.style.display = "grid";
    }

    // Delecte
    const deleteUser = () => {
        axios.delete("http://localhost:8000/api/delete", { withCredentials: true })
            .then(res => {
                console.log({ message: "user delete successfully", result: res })
                history.push('/')
            })
            .catch(err => {
                console.log({ message: "Error when deleting user", error: err })
            })

    }
    return (
        <div>
            <h1 style={{ textAlign: "center", marginBlockStart: "1rem" }}>hello , {LoggedInUser.username}.</h1>
            <span className="home-span">
                <a href="/home" style={{ textAlign: "center", textDecoration: "none", color: "var(--color-dark)", cursor: "pointer" }}>Home</a>
                <IoMdContrast className="IoMdContrast" style={{ color: "var(--color-dark)", cursor: "pointer" }} onClick={OpenThemModel} />
                <input type="button" id="noBorber" className="btn2 " style={{ marginLeft: '1rem' }} value="Delete Account" onClick={deleteUser} />

            </span>
            {/* <div className="profile-profile-pic">
                <img src="/assets/post/23.jpg" alt="profile picture" />
            </div> */}
            <div className="conatainer-info-form">
                <form onSubmit={UpdateLoggedUserInfo}>
                    <div className="info-form">
                        <h2>Update user info</h2>
                        <div>
                            <label htmlFor="username">username</label>
                            <input type="text" name="username" placeholder="username" className="input-bar" id="username" onChange={onChangeHandler} />
                        </div>

                        <div>
                            <label htmlFor="description">Description</label>
                            <input type="text" name="description" placeholder="Description" className="input-bar" id="description" onChange={onChangeHandler} />
                        </div>

                        <div>
                            <label htmlFor="city">City</label>
                            <input type="text" name="city" placeholder="city" id="city" className="input-bar" onChange={onChangeHandler} />
                        </div>

                        <div>
                            <label htmlFor="from">From</label>
                            <input type="text" name="from" placeholder="from" id="from" className="input-bar" onChange={onChangeHandler} />
                        </div>

                        <div>
                            <label htmlFor="relationship">Relationship Satue</label>
                            <select name="relationship" id="relationship" className="input-bar" onChange={onChangeHandler}>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Complicated">Complicated</option>
                            </select>
                        </div>
                        <button type="submit" className="btn2 btn-primary" >Update</button>
                    </div>
                </form>

            </div>

            <div className="editProfilePage-imageUpdate">
                <div className="editProfilePage-info-form">
                    {/* UPDATE PROFILE PICTURE */}
                    <form onSubmit={UpdateLoggedUserCoverOrProfilePic}  >
                        <div className="file-form" style={{ width: "100%" }}>
                            <h2>Update Profile picture</h2>
                            <div className="input-div" >
                                <label className="file-input" htmlFor="profilePicture"> Profile Picture <IoMdPhotos className="IoMdPhotos" /> </label>
                                <input type="file" style={{ display: "none" }} name="profilePicture" placeholder="profile Picture" id="profilePicture" onChange={onChangeProfilePicHandler} />
                            </div>
                            {profilePicFile && (
                                <div className="EditProfile-shareImageContainer">
                                    {/* <img className="shareImage"  src={PUBLIC_FOLDER + "person/default-profile-image.jpeg" } alt="image selected" />  */}
                                    <img className="EditProfile-shareImage" src={URL.createObjectURL(profilePicFile)} alt="image selected" />
                                    <span className="EditProfile-shareCancelImg" onClick={() => setProfilePicFile(null)}> <IoMdCloseCircle className="IoMdCloseCircle" /></span>
                                </div>
                            )}
                            <button type="submit" className="btn2 btn-primary">Update profile Picture</button>
                        </div>
                    </form>
                </div>

                <div className="conatainer-info-form">
                    {/* UPDATE COVER PICTURE */}
                    <form onSubmit={UpdateLoggedUserCoverOrProfilePic}  >
                        <div className="file-form" style={{ width: "100%" }}>
                            <h2>Update Cover picture</h2>
                            <div className="input-div" >
                                <label className="file-input" htmlFor="coverPicture"> Profile Picture <IoMdPhotos className="IoMdPhotos" /> </label>
                                <input type="file" style={{ display: "none" }} name="coverPicture" placeholder="cover Picture" id="coverPicture" onChange={onChangeCoverPicHandler} />
                            </div>
                            {coverPicFile && (
                                <div className="EditProfile-shareImageContainer">
                                    {/* <img className="shareImage"  src={PUBLIC_FOLDER + "person/default-profile-image.jpeg" } alt="image selected" />  */}
                                    <img className="EditProfile-shareImage" src={URL.createObjectURL(coverPicFile)} alt="image selected" />
                                    <span className="EditProfile-shareCancelImg" onClick={() => setCoverPicFile(null)}> <IoMdCloseCircle className="IoMdCloseCircle" /></span>
                                </div>
                            )}
                            <button type="submit" className="btn2 btn-primary">Update profile Picture</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default EditProfilePage;