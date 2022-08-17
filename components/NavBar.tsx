import { useState } from "react";
import {signOut} from "next-auth/react";

export default function NavBar(props: {
    status: string 
    session : {
        user : {
            email: string,
            name: string,
            image: string,
        }
    }
} 



) {

    function navigateToSignIn(){
        window.location.href= "/signin"
    }

    return (
    <>
    <div className="navbar" style={{verticalAlign: "sub"}}>
        <div style={{fontSize: "large"}}>
            <strong>liner notes</strong>
        </div>
        <div style={{color: "rgba(0,0,0,0.5",
                     fontSize: "large"}}>
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

        {props.session ? 
        <>
            <div className="navlink">
                <img 
                    onClick={() => signOut()}
                    style={{verticalAlign: "sub", 
                            height: 20, 
                            border:"dashed 1px black", 
                            borderRadius: 100,
                            cursor: "pointer"}}
                    src={props.session.user.image}></img>

            </div>
        </>
        :
        <>
        <div className="navlink">
            <div 
                style={{textAlign: "center", verticalAlign: "sub", height: 20, width: 20, 
                    border:"dashed 1px black", 
                    borderRadius: 100,
                    cursor: "pointer"}}
                onClick={()=> {navigateToSignIn()}} > 
                ?
            </div>
        </div>
        </>
        
        }

        

    </div>


    </div>
    </>)
}