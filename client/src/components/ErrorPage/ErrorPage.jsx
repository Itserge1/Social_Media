import React from "react"
import "./ErrorPage.css"

const ErrorPage = (props) => {
    return(
        <div className ="error-container">
            <h1>Error page</h1>
            <h3>Sorry user not found</h3>
            <a href="/home">Home</a>
        </div>
    )
}

export default ErrorPage