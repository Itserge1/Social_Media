import React, { useEffect, useState } from "react";
import "./ProfileFeed.css";

import axios from "axios";
import { useHistory } from "react-router-dom";


const ProfileFeed = (props) => {
    const history = useHistory();
    const [LoggedInUser, setLoggedInUser] = useState({});
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
                    console.log("ok")
                } 
            })
            .catch(err => {
                history.push("/")
                console.log("Erorr when getting logged in user", err)
            })
    }, [])
    return (
        <div>
            {/* =========== TOP FEED =============== */}
            <div className="profileTopFeed">
                <img src="/assets/post/1.jpeg" alt="profile pic" />
                <div className="profile-profile-pic">
                    <img src="/assets/person/1.jpeg" alt="profile pic" />
                </div>
                <div className="profile-profile-name">
                <h1>{LoggedInUser.username}</h1>
                    <p>{LoggedInUser.description}</p>
                </div>
            </div>
            {/* ================ FEED POST =================== */}
            <div className="profile-bottoms">
                {/* create post form */}
                <div className="feed-post">
                    {/* ======== Fist post =============*/}
                    <form class="create-post">
                        <div className="profile-pic">
                            <img src="/assets/person/1.png" alt="profile picture" />
                        </div>
                        <input type="text" className="create-post-input" placeholder="what is inside of you mind?" id="post-id" />
                        <input type="submit" value="Post" className="btn2 btn-primary" />
                    </form>
                    <div className="post">
                        <div className="post-top">
                            <div className="post-profile">
                                <div className="profile-pic">
                                    <img src="/assets/person/4.png" alt="profile profile" />
                                </div>
                                <div className="info">
                                    <h3>Lana Rose</h3>
                                    <small className="text-muted">Dubai,15 minutes ago</small>
                                </div>
                            </div>
                            <span className="edit"><i class="uil uil-ellipsis-h"></i></span>
                        </div>

                        {/* Photo */}
                        <div className="post-middle">
                            <img src="/assets/person/3.jpeg" alt="profile picture" />
                        </div>

                        {/* Bottom post */}
                        <div className="post-bottom">
                            {/* Action button */}
                            <div className="action-button">
                                <div className="interrection-button">
                                    <span><i class="uil uil-heart"></i></span>
                                    <span><i class="uil uil-comment-dots"></i></span>
                                    <span><i class="uil uil-share-alt"></i></span>
                                </div>
                                <div className="bookmark">
                                    <span><i class="uil uil-bookmark bookmark"></i></span>
                                </div>
                            </div>
                            <div className="like-by">
                                <span> <img src="/assets/person/10.jpeg" alt="profile picture" /></span>
                                <span> <img src="/assets/person/1.jpeg" alt="profile picture" /></span>
                                <span> <img src="/assets/person/9.jpeg" alt="profile picture" /></span>
                                <p>Liked by <b>Ernest Achiever</b> and <b>2,323 others</b></p>
                            </div>
                            <div className="caption">
                                <p><b>Lana Rose</b> Lorem ipsum dolor sit amet, consectetur adipisicing elit. <span className="harsh-tag">  #lifestyle </span></p>
                            </div>
                            <div className="comments text-muted">View all 227 comments</div>
                        </div>

                    </div>

                    {/* ======== second post =============*/}
                    <div className="post">
                        <div className="post-top">
                            <div className="post-profile">
                                <div className="profile-pic">
                                    <img src="/assets/person/2.png" alt="profile profile" />
                                </div>
                                <div className="info">
                                    <h3>Lana Rose</h3>
                                    <small className="text-muted">New York, 2 days ago</small>
                                </div>
                            </div>
                            <span className="edit"><i class="uil uil-ellipsis-h"></i></span>
                        </div>

                        {/* Photo */}
                        <div className="post-middle">
                            <img src="/assets/post/6.jpeg" alt="profile picture" />
                        </div>

                        {/* Bottom post */}
                        <div className="post-bottom">
                            {/* Action button */}
                            <div className="action-button">
                                <div className="interrection-button">
                                    <span><i class="uil uil-heart"></i></span>
                                    <span><i class="uil uil-comment-dots"></i></span>
                                    <span><i class="uil uil-share-alt"></i></span>
                                </div>
                                <div className="bookmark">
                                    <span><i class="uil uil-bookmark bookmark"></i></span>
                                </div>
                            </div>
                            <div className="like-by">
                                <span> <img src="/assets/person/9.jpeg" alt="profile picture" /></span>
                                <span> <img src="/assets/person/3.jpeg" alt="profile picture" /></span>
                                <span> <img src="/assets/person/8.jpeg" alt="profile picture" /></span>
                                <p>Liked by <b>Laura Kim</b> and <b>160,323 others</b></p>
                            </div>
                            <div className="caption">
                                <p><b>Lana Rose</b> Love my pet so much xoxo. <span className="harsh-tag">  #lifestyle </span></p>
                            </div>
                            <div className="comments text-muted">View all 227 comments</div>
                        </div>

                    </div>

                    {/* ======== second post =============*/}
                    <div className="post">
                        <div className="post-top">
                            <div className="post-profile">
                                <div className="profile-pic">
                                    <img src="/assets/person/8.png" alt="profile profile" />
                                </div>
                                <div className="info">
                                    <h3>Luci Smith</h3>
                                    <small className="text-muted">California, 8 hours ago</small>
                                </div>
                            </div>
                            <span className="edit"><i class="uil uil-ellipsis-h"></i></span>
                        </div>

                        {/* Photo */}
                        <div className="post-middle">
                            <img src="/assets/post/33.jpg" alt="profile picture" />
                        </div>

                        {/* Bottom post */}
                        <div className="post-bottom">
                            {/* Action button */}
                            <div className="action-button">
                                <div className="interrection-button">
                                    <span><i class="uil uil-heart"></i></span>
                                    <span><i class="uil uil-comment-dots"></i></span>
                                    <span><i class="uil uil-share-alt"></i></span>
                                </div>
                                <div className="bookmark">
                                    <span><i class="uil uil-bookmark bookmark"></i></span>
                                </div>
                            </div>
                            <div className="like-by">
                                <span> <img src="/assets/person/10.jpeg" alt="profile picture" /></span>
                                <span> <img src="/assets/person/2.jpeg" alt="profile picture" /></span>
                                <span> <img src="/assets/person/4.jpeg" alt="profile picture" /></span>
                                <p>Liked by <b>Lana Rose</b> and <b>2,000 others</b></p>
                            </div>
                            <div className="caption">
                                <p><b>Lana Rose</b> Capture the magic in every moment. <span className="harsh-tag">  #shoot </span></p>
                            </div>
                            <div className="comments text-muted">View all 227 comments</div>
                        </div>

                    </div>

                    {/* ======== second post =============*/}
                    <div className="post">
                        <div className="post-top">
                            <div className="post-profile">
                                <div className="profile-pic">
                                    <img src="/assets/person/7.png" alt="profile profile" />
                                </div>
                                <div className="info">
                                    <h3>Rick Mormor</h3>
                                    <small className="text-muted">Paris ,15 minutes ago</small>
                                </div>
                            </div>
                            <span className="edit"><i class="uil uil-ellipsis-h"></i></span>
                        </div>

                        {/* Photo */}
                        <div className="post-middle">
                            <img src="/assets/person/2.jpeg" alt="profile picture" />
                        </div>

                        {/* Bottom post */}
                        <div className="post-bottom">
                            {/* Action button */}
                            <div className="action-button">
                                <div className="interrection-button">
                                    <span><i class="uil uil-heart"></i></span>
                                    <span><i class="uil uil-comment-dots"></i></span>
                                    <span><i class="uil uil-share-alt"></i></span>
                                </div>
                                <div className="bookmark">
                                    <span><i class="uil uil-bookmark bookmark"></i></span>
                                </div>
                            </div>
                            <div className="like-by">
                                <span> <img src="/assets/person/4.jpeg" alt="profile picture" /></span>
                                <span> <img src="/assets/person/1.jpeg" alt="profile picture" /></span>
                                <span> <img src="/assets/person/3.jpeg" alt="profile picture" /></span>
                                <p>Liked by <b>Mic Mormor</b> and <b>300,000 others</b></p>
                            </div>
                            <div className="caption">
                                <p><b>Rick Mormor</b> Trying to look like my grand father. <span className="harsh-tag">  #lifestyle </span></p>
                            </div>
                            <div className="comments text-muted">View all 100,027 comments</div>
                        </div>

                    </div>

                    {/* ======== second post =============*/}
                    <div className="post">
                        <div className="post-top">
                            <div className="post-profile">
                                <div className="profile-pic">
                                    <img src="/assets/person/7.png" alt="profile profile" />
                                </div>
                                <div className="info">
                                    <h3>Mic Mormor</h3>
                                    <small className="text-muted"> Paris, 7 days ago</small>
                                </div>
                            </div>
                            <span className="edit"><i class="uil uil-ellipsis-h"></i></span>
                        </div>

                        {/* Photo */}
                        <div className="post-middle">
                            <img src="/assets/post/23.jpg" alt="profile picture" />
                        </div>

                        {/* Bottom post */}
                        <div className="post-bottom">
                            {/* Action button */}
                            <div className="action-button">
                                <div className="interrection-button">
                                    <span><i class="uil uil-heart"></i></span>
                                    <span><i class="uil uil-comment-dots"></i></span>
                                    <span><i class="uil uil-share-alt"></i></span>
                                </div>
                                <div className="bookmark">
                                    <span><i class="uil uil-bookmark bookmark"></i></span>
                                </div>
                            </div>
                            <div className="like-by">
                                <span> <img src="/assets/person/5.jpeg" alt="profile picture" /></span>
                                <span> <img src="/assets/person/9.jpeg" alt="profile picture" /></span>
                                <span> <img src="/assets/person/8.jpeg" alt="profile picture" /></span>
                                <p>Liked by <b>Ernest Achiever</b> and <b>1,302,323 others</b></p>
                            </div>
                            <div className="caption">
                                <p><b>Rick Mormor</b> I think i'm to old fro this <span className="harsh-tag">  #lifestyle </span></p>
                            </div>
                            <div className="comments text-muted">View all 1,000,227 comments</div>
                        </div>

                    </div>
                </div>
                {/* ===================== Profile Info ======================= */}
                <div className="profile-friend">
                    {/* add freinds */}
                    <div className="profile-user-info">
                        <h3>User Information</h3>
                        <p><b>City: </b> <span className="text-muted"> {LoggedInUser.city}</span> </p>
                        <p><b>From: </b> <span className="text-muted"> {LoggedInUser.from} </span></p>
                        <p><b>Relationship: </b>  <span className="text-muted"> {LoggedInUser.relationship}</span></p>
                    </div>
                    <div className="user-freind-general">
                        <h3>User Freinds</h3>
                        <div className="profile-user-profiles">
                            {/* ============= ONE FIREND ================= */}
                            <div className="profile-user-profile">
                                <div className="profile-user-profile-pic">
                                    <img src="/assets/person/6.jpeg" alt="" />
                                </div>
                                <h4>John Carter</h4>
                            </div>
                            {/* ============= ONE FIREND ================= */}
                            <div className="profile-user-profile">
                                <div className="profile-user-profile-pic">
                                    <img src="/assets/person/6.jpeg" alt="" />
                                </div>
                                <h4>John Carter</h4>
                            </div>
                            {/* ============= ONE FIREND ================= */}
                            <div className="profile-user-profile">
                                <div className="profile-user-profile-pic">
                                    <img src="/assets/person/6.jpeg" alt="" />
                                </div>
                                <h4>John Carter</h4>
                            </div>
                            {/* ============= ONE FIREND ================= */}
                            <div className="profile-user-profile">
                                <div className="profile-user-profile-pic">
                                    <img src="/assets/person/6.jpeg" alt="" />
                                </div>
                                <h4>John Carter</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileFeed;