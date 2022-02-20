import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import "./EditProfilePage.css"

const EditProfilePage = () => {
    const [userForm, setUserForm] = useState({});
    const [LoggedInUser, setLoggedInUser] = useState({});
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

    const onChangeHandler = (event) => {
        setUserForm({
            ...userForm,
            [event.target.name]: event.target.value,
        })
    }

    const UpdateLoggedUser = (event) => {
        event.preventDefault();
        axios.patch("http://localhost:8000/api/update", userForm, { withCredentials: true })
            .then(res => {
                history.push("/profile")
                console.log({ message: "User updated", results: res })
            })
            .catch(err => {
                history.push("/edit")
                console.log({ error: "unable to update user", error: err })
            })
    }
    return (
        <div>
            <h1>hello , {LoggedInUser.username}.</h1>
            <a href="/home">Home</a>
            <div className="profile-profile-pic">
                <img src="/assets/post/23.jpg" alt="profile picture" />
            </div>
            <form onSubmit={UpdateLoggedUser}>
                <div>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" placeholder="username" id="username" onChange={onChangeHandler} />
                </div>

                <div>
                    <label htmlFor="profilePicture">profile Picture</label>
                    <input type="text" name="profilePicture" placeholder="profile Picture" id="profilePicture" onChange={onChangeHandler} />
                </div>

                <div>
                    <label htmlFor="coverPicture">cover Picture</label>
                    <input type="text" name="coverPicture" placeholder="cover Picture" id="coverPicture" onChange={onChangeHandler} />
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
        </div>
    )
}

export default EditProfilePage;