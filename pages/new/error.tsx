import NavBar from "../../components/NavBar";
import { GetServerSidePropsContext } from "next";
import {getSession} from "next-auth/react";

export default function Error(props : {
    session : {
        user : {
            email: string,
            name: string,
            image: string,
        }
    }
}) {
    return (
        <>
        <NavBar status="error" session={props.session}></NavBar>
        <div className="center">
            <p> Error: Did you enter a valid URL or URI? </p>
            <a href="/" className="underline">back to home</a>

            <br></br> 
            <br></br>
            <br></br>
            <a href="/help#how-to-find" className="underline">how to find the URL or URI of a playlist</a>
        </div>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext){
    const session = await getSession(context);

    if (!session) return {props: {}};

    return {redirect: {permanent: false, destination: "/"}}
}