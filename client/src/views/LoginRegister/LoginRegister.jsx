import React from "react";
import "./LoginRegister.css";

const LoginRegister = (props) => {
    const login = (props) => {
        var x = document.getElementById("login")
        var y = document.getElementById("register")
        var z = document.getElementById("LoginRegister-btn")
        x.style.left = "50px"
        y.style.left = "450px"
        z.style.left = "0px"
    }

    const register = (props) => {
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
                                <button type="button" className="toggle-btn" onClick={() => login()}>Login</button>
                                <button type="button" className="toggle-btn" onClick={() => register()}>Register</button>
                            </div>

                            <div className="LoginRegister-social-icons">
                                <img src="/login-reg-img/fb.png" alt="facebook icon"/>
                                <img src="/login-reg-img/gp.png" alt="Google icon" />
                                <img src="/login-reg-img/tw.png" alt="Twitter icon" />
                                {/* <i class="uil uil-home"></i> */}
                                {/* <img src="../../../public/login-reg-img/tw.png" alt="Twitter icon" /> */}
                            </div>

                            {/*  =============== LOGIN =================== */}

                            <form id="login" className="input-group">
                                <input type="text" className="input-feild" placeholder="Username" />
                                <input type="text" className="input-feild" placeholder="Password" />
                                <input type="checkbox" className="checkbox" name="" id="" /><span>Remember Password</span>
                                <button type="submit" className="LoginRegister-submit-btn">Login</button>
                            </form>

                            {/*  =============== REGISTER =================== */}

                            <form id="register" className="input-group">
                                <input type="text" className="input-feild" placeholder="Username" />
                                <input type="email" className="input-feild" placeholder="Email" />
                                <input type="text" className="input-feild" placeholder="Password" />
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