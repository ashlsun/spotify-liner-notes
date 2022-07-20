import { useState } from "react";

export default function NavBar(props: {} ) {
    return (
    <>
    <div className="navbar">
        <strong>Liner Notes</strong>
    
    <div className="navlink-section">
        <div className="navlink">
            <a href="/">Home</a> 
        </div>

        <div className="navlink">
            <a href="/about">About</a>
        </div>

    </div>


    </div>
    </>)
}