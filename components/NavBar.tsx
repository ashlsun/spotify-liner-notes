import { useState } from "react";

export default function NavBar(props: {
    status: string
} ) {
    return (
    <>
    <div className="navbar">
        <strong>Liner Notes</strong>
        <div style={{color: "rgba(0,0,0,0.5"}}>
            {props.status ? <>: {props.status}</> : ""}
        </div>
    
    <div className="navlink-section">
        <div className="navlink">
            <a href="/">Home</a> 
        </div>

        <div className="navlink">
            <a href="/about">About</a>
        </div>

        <div className="navlink">
            <a href="/help">Help</a>
        </div>

    </div>


    </div>
    </>)
}