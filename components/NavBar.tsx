import { useState } from "react";

export default function NavBar(props: {
    status: string
} ) {
    return (
    <>
    <div className="navbar">
        <strong>liner notes</strong>
        <div style={{color: "rgba(0,0,0,0.5"}}>
            {props.status ? <>: {props.status}</> : ""}
        </div>
    
    <div className="navlink-section">
        <div className="navlink">
            [<a className="invisible-link" href="/">home</a>]
        </div>

        <div className="navlink">
            [<a className="invisible-link" href="/about">about</a>]
        </div>

        <div className="navlink">
            [<a className="invisible-link" href="/help">help</a>]
        </div>

    </div>


    </div>
    </>)
}