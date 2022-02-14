import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Leftbar from "../Leftbar/Leftbar";
import ProfileFeed from "../../components/ProfileFeed/ProfileFeed";
import "./ProfilePage.css";

const ProfilePage = (props) => {
    return (
        <div>
            <div className="profile-topbar">
                <Navbar />
            </div>
            <main >
                <div className="profile-container">
                    <div className="left">
                        <Leftbar />
                    </div>
                    <div className="profile-feed">
                        <ProfileFeed/>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ProfilePage;