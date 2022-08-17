import { GetServerSidePropsContext } from "next";
import {getSession, signIn} from "next-auth/react";
import NavBar from "../components/NavBar";

export default function SignIn(props : {
    session : {
        user : {
            email: string,
            name: string,
            image: string,
        }
    }
}){
    return (
        <>
        
        <NavBar status="sign in" session={props.session}></NavBar>
        <div className="center" style={{textAlign: "center"}}>
            <button style={{color: "black"}} onClick={()=>signIn("spotify")}>Sign in to Spotify</button>
            <p style={{fontSize: "small", maxWidth: 400}}>
                <b>note</b>: since this still is in development, signing in
                won't work until I manually add you to the user list! 
                please send me the email associated with your account
                to get added!
            </p>
            <br></br>

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