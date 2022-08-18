import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import NavBar from "../components/NavBar";
import { GetServerSidePropsContext } from "next";
import {getSession, signOut} from "next-auth/react";
import PlaylistPreview from "../components/PlaylistPreview";

export default function Profile(props : {
    session : {
        user : {
            email: string,
            name: string,
            image: string,
        }
    }
}) {

    const [viewPublished, setViewPublished] = useState(true)
    const [posts, setPosts] = useState<{body: string, _id: string, name: string, notes:string[], email: string}[]> ([]);
    const [loadingPublished, setLoadingPublished] = useState(false)

    function onRequest() {
        axios.get("api/myPlaylists").then(res=> {
            console.log("yey", res.data)
            setPosts(res.data.posts)
        }).catch(e => console.log(e))
    }

    useEffect(()=> {
        onRequest()
        setLoadingPublished(true)
    }, []);

    return (
        <>
        
        <Head>
            <title>liner notes: profile</title>
        </Head>

        <NavBar status="profile" session={props.session}></NavBar>
            {/* <input type="text" value={newPostBody} onChange={e => setNewPostBody(e.target.value)} />
            <button onClick={onAdd}>Add</button> */}

        <div style={{padding: "10%"}}>
            <p> 
                <b>name</b>: {props.session.user.name}
                <br></br>
                <b>email</b>: {props.session.user.email}
            </p>

            <button onClick={()=>signOut()} style={{color: "black"}}>Sign out</button>

            <br></br>
            <br></br>
            <hr style={{borderTop: "dashed 0.5px", borderBottom : "0px"}}/>

            <div style={{display: "flex"}}>
                <div 
                    onClick={()=>{setViewPublished(true)}}
                    style={{width: "30%", cursor: "pointer", color: viewPublished ? "black" : "lightgrey"}}>
                    <b>published</b>
                </div>
                <div 
                    onClick={()=>{setViewPublished(false)}}
                    style={{width: "30%", cursor: "pointer", color: viewPublished ? "lightgrey" : "black"}}>
                    <b>drafts</b>
                </div>
            </div>
            
            

            <div style={{display: viewPublished ? "" : "none"}}>
                {loadingPublished ? 
                    posts.map(d => (
                        <>
                        <PlaylistPreview key={d._id} name={d.name} body={d.body}/>
                        </>
                    ))
                :
                <>
                <br></br>
                <div style={{color: "grey"}}>Loading your playlists...</div>
                </>
                }
                
                

            </div>

            <h2></h2>
        </div>

        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext){
    const session = await getSession(context);

    if (!session) return {redirect: {permanent: false, destination: "/signin"}}
    
    return {props: {session: session}}
}