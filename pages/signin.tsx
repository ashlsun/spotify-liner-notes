import { GetServerSidePropsContext } from "next";
import {getSession, signIn} from "next-auth/react";
import NavBar from "../components/NavBar";

export default function SignIn(){
    return (
        <>
        
        <NavBar status="sign in" session={{user: {name: "", email: "", image:""}}}></NavBar>
        <div className="center" style={{textAlign: "center"}}>
            <button style={{color: "black"}} onClick={()=>signIn("spotify")}>Sign in to Spotify</button>
            <p style={{fontSize: "small"}}>
                <a href="/help#spotify">what does sign in with spotify do?</a>
            </p>
        </div>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext){
    const session = await getSession(context);

    if (!session) return {props: {}};

    return {redirect: {permanent: false, destination: "/"}}
}