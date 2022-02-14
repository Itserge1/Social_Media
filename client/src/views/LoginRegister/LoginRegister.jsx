import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import "./LoginRegister.css";

const LoginRegister = (props) => {
    const history = useHistory();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword:"",
        // profilePicture: "",
        // coverPicture: "",
        // followers: [],
        // isAdmin: false,
        // description: "",
        // city: "",
        // from: "",
        // relationship: "",
    });

    const oneChangeHandler = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        })
    }

    // LOGIN AN REGISTER  (BACKEND)
    
    // Login
    const login = (event) =>{
        event.preventDefault(); // stop the page from refreching
        console.log(form)
        axios.post("http://localhost:8000/api/login", form)
            .then( res => {
                console.log(res);
                history.push("/home")
            })
            .catch(err => {
                console.log(err)
            })


    }

    // Register
    const register = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/register", form)
            .then(res => {
                console.log(res)
                history.push("/home") // redirect to an edit profile 
            })
            .catch(err => {
                console.log(err)
            })

    }




    // LOGIN AN REGISTER SLIDER (FRONTEND)
    const loginSlider = (props) => {
        var x = document.getElementById("login")
        var y = document.getElementById("register")
        var z = document.getElementById("LoginRegister-btn")
        x.style.left = "50px"
        y.style.left = "450px"
        z.style.left = "0px"
    }

    const registerSlider = (props) => {
        var x = document.getElementById("login")
        var y = document.getElementById("register")
        var z = document.getElementById("LoginRegister-btn")
        x.style.left = "-400px"
        y.style.left = "50px"
        z.style.left = "110px"
    }
    return (
        <div>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Document</title>
                    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.6/css/unicons.css"></link>
                </head>
                <body>
                    <div className="LoginRegister-container">
                        <div className="form-box">
                            <div className="button-box">
                                <div id="LoginRegister-btn"></div>
                                <button type="button" className="toggle-btn" onClick={() => loginSlider()}>Login</button>
                                <button type="button" className="toggle-btn" onClick={() => registerSlider()}>Register</button>
                            </div>

                            <div className="LoginRegister-social-icons">
                                <img src="/login-reg-img/fb.png" alt="facebook icon"/>
                                <img src="/login-reg-img/gp.png" alt="Google icon" />
                                <img src="/login-reg-img/tw.png" alt="Twitter icon" />
                                {/* <i class="uil uil-home"></i> */}
                                {/* <img src="../../../public/login-reg-img/tw.png" alt="Twitter icon" /> */}
                            </div>

                            {/*  =============== LOGIN =================== */}

                            <form onSubmit={login} id="login" className="input-group">
                                <input type="email" className="input-feild" placeholder="email" name="email" onChange={oneChangeHandler}/>
                                <input type="password" className="input-feild" placeholder="Password" name="password" onChange={oneChangeHandler}/>
                                <input type="checkbox" className="checkbox" name="" id="" /><span>Remember Password</span>
                                <button type="submit" className="LoginRegister-submit-btn">Login</button>
                            </form>

                            {/*  =============== REGISTER =================== */}

                            <form onSubmit={register} id="register" className="input-group">
                                <input type="text" className="input-feild" placeholder="Username" name="username" onChange={oneChangeHandler} />
                                <input type="email" className="input-feild" placeholder="Email" name="email" onChange={oneChangeHandler}/>
                                <input type="password" className="input-feild" placeholder="Password" name="password" onChange={oneChangeHandler}/>
                                <input type="password" className="input-feild" placeholder="Confirm Password" name="confirmPassword" onChange={oneChangeHandler}/>
                                <input type="checkbox" className="checkbox" name="" id="" /><span>I agree to the terms and conditions</span>
                                <button type="submit" className="LoginRegister-submit-btn">Register</button>
                            </form>

                        </div>
                    </div>
                    {/* <!-- Link a js file --> */}
                    {/* <!-- <script src="{{ url_for('static', filename= 'script/home.js') }}"></script> --> */}
                </body>
            </html>
        </div>
    )
}

export default LoginRegister;