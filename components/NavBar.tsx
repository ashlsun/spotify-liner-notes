import { useState } from "react";
import {signOut} from "next-auth/react";
import {AiOutlineSmile} from "react-icons/ai"
import { IconContext } from "react-icons";

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

    function navigateToProfile(){
        window.location.href= "/profile"
    }

    return (
    <>
    <div className="navbar" style={{verticalAlign: "sub", lineHeight: "21px", paddingBottom: "8px"}}>
        <div style={{fontSize: "18px"}}>
            <strong className="narrow">ln</strong>
            <strong className="wide">
            <a style={{textDecoration: "none"}} href="/">
                liner notes
            </a>
            </strong>
        </div>
        <div style={{color: "rgba(0,0,0,0.5",
                     fontSize: "large"}}>
            {props.status ? <>: {props.status}</> : ""}
        </div>
    
    <div className="navlink-section">
        <div className="navlink">
            <a className="invisible-link" href="/">home</a>
        </div>

        <div className="navlink">
            <a className="invisible-link" href="/about">about</a>
        </div>

        <div className="navlink">
            <a className="invisible-link" href="/help">help</a>
        </div>

        {props.session ? 
            (props.session.user.image ? 
                <>
                    <div className="navlink">
                        <img 
                            onClick={()=> {navigateToProfile()}}
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
                                border:"dashed 1px grey", 
                                borderRadius: 100,
                                cursor: "pointer"}}
                            onClick={()=> {navigateToProfile()}} > 

                            <IconContext.Provider value={{ style: { verticalAlign: 'sub'} }}>
                                <AiOutlineSmile/>
                            </IconContext.Provider> 
                            
                        </div>
                    </div>
                </>)
        :
        <>
        <div className="navlink">
            <div 
                style={{textAlign: "center", verticalAlign: "sub", height: 20, width: 20, 
                    border:"dashed 1px grey", 
                    borderRadius: 100,
                    cursor: "pointer"}}
                onClick={()=> {navigateToSignIn()}} > 

                <IconContext.Provider value={{ style: { verticalAlign: 'sub' , color: "lightgrey"} }}>
                    <AiOutlineSmile/>
                </IconContext.Provider> 
                
            </div>
        </div>
        </>
        
        }

        

    </div>


    </div>
    </>)
}