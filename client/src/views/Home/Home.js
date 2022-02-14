import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Leftbar from "../../components/Leftbar/Leftbar";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";

const Home = (props) => {
    return(
        <div>
            <div className="topbar">
                <Navbar/>
            </div>
            <main >
                <div className="container">
                    <div className="left">
                        <Leftbar/>
                    </div>
                    
                    <div className="feed">
                        <Feed/>
                    </div>
                    
                    <div  className="right">
                        <Rightbar/>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home;