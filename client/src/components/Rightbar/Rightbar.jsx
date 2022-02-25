import React from "react";
import "./Rightbar.css";

const Rightbar = (props) => {

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Right part</title>
                    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v2.1.6/css/unicons.css"></link>
                    <link rel="stylesheet" href="./Rightbar.css" />
                </head>
                <body>
                    <div className="messages">
                        <div className="top">
                            {/* ========== Heading =========== */}
                            <div className="heading">
                                <h4>Messages</h4> <span><i class="uil uil-edit"></i></span>
                            </div>
                            {/* ========== Search bar =========== */}
                            <div className="Search-bar">
                                <span><i class="uil uil-search"></i></span>
                                <input type="search" placeholder="Search message" id="message-search" />
                            </div>
                            {/* ============ Message Catergories =========== */}
                            <div className="category">
                                <h6 class="active">Primary</h6>
                                <h6 >General</h6>
                                <h6 className="message-requests">Requests(7)</h6>
                            </div>
                            {/* ============= Message 1 ============ */}
                            <div className="message">
                                <div className="profile-pic">
                                    <img src={`${PUBLIC_FOLDER}person/5.png`} alt="profile picture" />
                                </div>
                                <div className="message-body">
                                    <h5>Jen</h5>
                                    <p class="text-muted">Hey, why did you miss your yoga class!!</p>
                                </div>
                            </div>
                            {/* ============= Message 2============ */}
                            <div className="message">
                                <div className="profile-pic">
                                    <img src={`${PUBLIC_FOLDER}person/4.png`} alt="profile picture" />
                                    <div className="active"></div>
                                </div>
                                <div className="message-body">
                                    <h5>Lucia </h5>
                                    <p class="text-muted">heyy, i'm gaming. wanna join?</p>
                                </div>
                            </div>
                            {/* ============= Message 3============ */}
                            <div className="message">
                                <div className="profile-pic">
                                    <img src={`${PUBLIC_FOLDER}person/3.png`} alt="profile picture" />
                                </div>
                                <div className="message-body">
                                    <h5>Rick</h5>
                                    <p class="text-bold">You nedd to finished that project on time.</p>
                                </div>
                            </div>
                            {/* ============= Message 3============ */}
                            <div className="message">
                                <div className="profile-pic">
                                    <img src={`${PUBLIC_FOLDER}person/1.png`} alt="profile picture" />
                                    <div className="active"></div>
                                </div>
                                <div className="message-body">
                                    <h5>George</h5>
                                    <p class="text-bold">3 new message(s) </p>
                                </div>
                            </div>
                        </div>
                        {/* ========= END OF MESSAGE =========== */}

                        {/* ========== REQUEST ============ */}
                        <div className="friend-requests">
                            <h4>Request(s)</h4>
                            <div className="request">
                                <div className="info">
                                    <div className="profile-pic">
                                        <img src={`${PUBLIC_FOLDER}person/6.png`} alt="profile pic" />
                                    </div>
                                    <div>
                                        <h5>Lauretta Vshiwk</h5>
                                        <p className="text-muted">8 mutual friend(s)</p>
                                    </div>
                                </div>
                                <div className="action">
                                    <input type="button" className="btn btn-primary" value="Accept" />
                                    <input type="button" id="noBorber" className="btn " value="Denied" />
                                </div>
                            </div>

                            <div className="request">
                                <div className="info">
                                    <div className="profile-pic">
                                        <img src={`${PUBLIC_FOLDER}person/8.png`} alt="profile pic" />
                                    </div>
                                    <div>
                                        <h5>Luci Smith</h5>
                                        <p className="text-muted">2 mutual friend (s)</p>
                                    </div>
                                </div>
                                <div className="action">
                                    <input type="button" className="btn btn-primary" value="Accept" />
                                    <input type="button" id="noBorber" className="btn " value="Denied" />
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        </div>
    )
}

export default Rightbar;