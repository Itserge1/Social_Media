import React, { useEffect, useState } from "react";
import "./PostForm.css"

import axios from "axios";
import { useHistory } from "react-router";


const PostForm = () => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    const [LoggedInUser, setLoggedInUser] = useState({});
    const [file, setFile] = useState(null);
    const [form, setForm] = useState({
        userId: "",
        // userId:"620ae28ab23cc7e406a4e017",
        description: "",
        image: null,
        cloudinary_id: null,
    });

    const history = useHistory();


    // GET THE LOGGED IN USER WITH JASONWEBTOKEN
    useEffect(() => {
        axios.get(`http://localhost:8000/api/finduser`, { withCredentials: true })
            .then(res => {
                // console.log("LeftBar: Your logged in user info", res)
                // res.data.results will contains the info of the user, 
                // that has its id in the cookies. if the user logged in, he will have one. 
                // if not he won't have a cookie therefore no info
                if (res.data.results) {
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
        // console.log({message:"Here is your event", event: event});
        setForm({
            ...form,
            userId: LoggedInUser._id,
            [event.target.name]: event.target.value,
        });
        if (event.target.files) {
            setFile(event.target.files[0])
            setForm({
                ...form,
                image: null,
                cloudinary_id: null,
            });
        }
    }

    // Make a post
    const makeApost = async (event) => {
        // Stop the page from reloading
        event.preventDefault();
        // Checking my state
        console.log({ message: "New form", from: form, file: file })

        // If the user select a file we want to upload it to our cloud base and save the path
        if (file != null) {
            // Creating a new form data to upload our file
            const formData = new FormData();
            formData.append('file', file)
            formData.append('upload_preset', 'my-social-media-uploads')

            // Uploading the file to our cloud platform
            console.log(process.env.REACT_APP_CLOUDINARY_COULD_NAME)
            const result = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_COULD_NAME}/image/upload`, formData)

            // Checking the info needed for our new post object
            // console.log(result)
            // console.log(form)
            // console.log(result.data.secure_url)
            // console.log(result.data.public_id)
            // console.log(form.userId)
            // console.log(form.description)

            // Creating the new post object 
            const NewPost = {
                userId: LoggedInUser._id,
                description:form.description,
                image: result.data.secure_url,
                cloudinary_id:result.data.public_id
            }

            // Checking the new post object
            console.log(NewPost)

            // Making the axios call that will create our post in our MongoDB
            axios.post("http://localhost:8000/api/newpost", NewPost, { withCredentials: true })
                .then(res => {
                    console.log({ message: "Here is your res", res: res });
                    window.location.reload() // this code refresh the page after a post
                })
                .catch(err => {
                    console.log({ message: "Here is your err", err: err });
                })
        } else {
            // If we dont have a file selected then send the form instead.
            axios.post("http://localhost:8000/api/newpost", form, { withCredentials: true })
                .then(res => {
                    console.log({ message: "Here is your res", res: res });
                    window.location.reload() // this code refresh the page after a post
                })
                .catch(err => {
                    console.log({ message: "Here is your err", err: err });
                })
        }

    }
    return (
        <div>
            {/* create post form */}
            <form className="feed-post-form" onSubmit={makeApost}>
                <div className="create-post">
                    <div className="profile-pic">
                        <img className="postForm-profile-pic" src={LoggedInUser.profilePicture ? LoggedInUser.profilePicture : `${PUBLIC_FOLDER}person/default-profile-image.jpeg`} alt="profile picture" />
                    </div>
                    <input type="text" className="create-post-input" placeholder="what is inside of you mind?" id="post-id" name="description" onChange={onChangeHandler} />
                    {/* <input type="hidden"  value={LoggedInUser._id}  name="userId"/> */}
                    <input type="submit" value="Post" className="btn2 btn-primary" />
                    {/* <button type="submit"  className="btn2 btn-primary">Post</button> */}
                </div>
                {file && (
                    <div className="shareImageContainer">
                        {/* <img className="shareImage"  src={PUBLIC_FOLDER + "person/default-profile-image.jpeg" } alt="image selected" />  */}
                        <img className="shareImage" src={URL.createObjectURL(file)} alt="image selected" />
                        <span className="shareCancelImg" onClick={() => setFile(null)}> <i class="uil uil-multiply"></i></span>
                    </div>
                )}

                <div className="feed-files">
                    <span className="feed-files-icons">
                        <label className="feed-files-icons" htmlFor="image"><i className="uil uil-image-plus" id="orange"></i> Photos/Videos </label>
                        <input type="file" style={{ display: "none" }} accept="image/*" id="image" name="image" onChange={onChangeHandler} />
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