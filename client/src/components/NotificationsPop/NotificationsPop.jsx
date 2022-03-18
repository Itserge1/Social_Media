import React from 'react'
import './NotificationsPop.css'

const NotificationsPop = () => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div>
            <div className="notification-popup">

                <div>
                    <div className="profile-pic">
                        <img src={`${PUBLIC_FOLDER}person/1.png`} alt="Person picture" />
                    </div>
                    <div className="notification-body">
                        <b>Kenny Michel </b> accepted your friend request
                        <small className="text-muted">2 days ago</small>
                    </div>
                </div>

                <div>
                    <div className="profile-pic">
                        <img src={`${PUBLIC_FOLDER}person/1.png`} alt="Person picture" />
                    </div>
                    <div className="notification-body">
                        <b>Alex Kubel </b> commented on your post
                        <small className="text-muted">7 days ago</small>
                    </div>
                </div>

                <div>
                    <div className="profile-pic">
                        <img src={`${PUBLIC_FOLDER}person/1.png`} alt="Person picture" />
                    </div>
                    <div className="notification-body">
                        <b>Micheal Smith </b> Started following you
                        <small className="text-muted">26 min ago</small>
                    </div>
                </div>

                <div>
                    <div className="profile-pic">
                        <img src={`${PUBLIC_FOLDER}person/1.png`} alt="Person picture" />
                    </div>
                    <div className="notification-body">
                        <b>Brethany Amber  </b> share  your post
                        <small className="text-muted">1 hour ago</small>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default NotificationsPop;