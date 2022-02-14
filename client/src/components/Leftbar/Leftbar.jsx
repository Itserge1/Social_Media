import React from "react";
import "./Leftbar.css";

const Leftbar = (props) => {

    // theme display
    const OpenThemModel = () => {
        const themeModel = document.querySelector(".customize-theme")
        themeModel.style.display = "grid";
    }
    // close
    const CloseThemModel = () => {
        const themeModel = document.querySelector(".customize-theme")
        themeModel.style.display = "none";
    }

    return(
        <div>
            <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Left Bar</title>
                <link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.6/css/unicons.css"></link>
                <link rel="stylesheet" href="./Leftbar.css" />
            </head>
            <body>

                {/* ======================= PROFILE ==================== */}
                <a className="profile">
                    <div className="profile-pic">
                        <img src="/assets/person/1.png" alt="Profile picture" />
                    </div>
                    <div className="profile-name">
                        <h2>Diana Ayi</h2>
                        <p className="text-muted">@dayi</p>
                    </div>
                </a>
                {/* ======================= SIDEBAR ====================== */}
                <div className="sidebar">
                    <a className="menu-item active">
                        <span> <i class="uil uil-home"></i> </span> <h3>Home</h3>
                    </a>
                    <a className="menu-item">
                        <span> <i class="uil uil-compass"></i> </span> <h3>Explore</h3>
                    </a>
                    <div className="menu-item" id="notifications">
                        <span> <i class="uil uil-bell"><small className="notification-count">9</small></i> </span> <h3>Notifications</h3>
                        {/* =============== NOTIFICATION POPUP ============ */}
                        <div className="notification-popup">

                            <div>
                                <div className="profile-pic">
                                    <img src="/assets/person/1.png" alt="Person picture" />
                                </div>
                                <div className="notification-body">
                                    <b>Kenny Michel </b> accepted your friend request
                                    <small  className="text-muted">2 days ago</small>
                                </div>
                            </div>

                            <div>
                                <div className="profile-pic">
                                    <img src="/assets/person/1.png" alt="Person picture" />
                                </div>
                                <div className="notification-body">
                                    <b>Alex Kubel </b> commented on your post
                                    <small  className="text-muted">7 days ago</small>
                                </div>
                            </div>

                            <div>
                                <div className="profile-pic">
                                    <img src="/assets/person/1.png" alt="Person picture" />
                                </div>
                                <div className="notification-body">
                                    <b>Micheal Smith </b> Started following you
                                    <small  className="text-muted">26 min ago</small>
                                </div>
                            </div>

                            <div>
                                <div className="profile-pic">
                                    <img src="/assets/person/1.png" alt="Person picture" />
                                </div>
                                <div className="notification-body">
                                    <b>Brethany Amber  </b> share  your post
                                    <small  className="text-muted">1 hour ago</small>
                                </div>
                            </div>
                        </div>
                        {/* =============== END NOTIFICATION POPUP ============ */}
                    </div>


                    <a className="menu-item"  id="messages-notifications">
                        <span> <i class="uil uil-envelope"> <small className="notification-count">6</small></i> </span> <h3>Messages</h3>
                    </a>
                    <a className="menu-item">
                        <span> <i class="uil uil-bookmark"></i> </span> <h3>Bookmarks</h3>
                    </a>
                    <a className="menu-item">
                        <span> <i class="uil uil-chart-line"></i> </span> <h3>Analytics</h3>
                    </a>
                    <a className="menu-item"  onClick= {OpenThemModel}>
                        <span> <i class="uil uil-palette"></i> </span> <h3>Theme</h3>
                    </a>
                    <a className="menu-item">
                        <span> <i class="uil uil-setting"></i> </span> <h3>Settings</h3>
                    </a>
                </div>
                {/* ============= BUTTON ================*/}
                <label htmlFor="creat-post" className="btn btn-primary"> Create Post</label>
            </body>
            </html>
        </div>
    )
}

export default Leftbar;