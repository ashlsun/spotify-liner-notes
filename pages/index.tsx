import { useState } from "react";
import Head from "next/head";
import axios from "axios";
import NavBar from "../components/NavBar";
import { GetServerSidePropsContext } from "next";
import {getSession} from "next-auth/react";

export default function Index(props : {
    session : {
        user : {
            email: string,
            name: string,
            image: string,
        }
    }
}) {
    const [playlistId, setPlaylistId] = useState("")
    const [validInput, setValidInput] = useState(true)
    const [newPostBody, setNewPostBody] = useState("");
    const examples = [
        "p/friends-songs-example",
        "p/Friends-songs-3",
        "p/friends-songs-example",
        "p/rh-gets-local",
        "p/OA-leader-sad-hour",
        "p/dont-you-feel-like-a-fraud-sometimes"
    ]

    function navigate(input: string){
        let id = "error"
        if (isValidUrl(input)) {
            console.log(input)
            id = getIdFromUrl(input)
        } else if (isValidUri(input)) {
            id = getIdFromUri(input)
        }
        window.location.href= "/new/"+id

    }

    
    function onAdd(){
        axios.post("/api/post", {body: newPostBody})
            .then(() => {
                setNewPostBody("");
            }).catch(e => console.log(e));
    }

    function isValidUrl(input: string){
        return (input.match("https://open.spotify.com/playlist/"))   
    }

    function getIdFromUrl(url: string){
        return url.split("/")[4]
    }
    

    function isValidUri(input: string){
        return (input.match("spotify:playlist:")) 
    }

    function getIdFromUri(uri: string){
        return uri.split(":")[2]
    }
    
    function chooseRandomExample() {
        const randInt = Math.floor(Math.random() * 5);
        // window.location.href= examples[randInt]
        return examples[randInt]

    }

    return (
        <>
        
        <Head>
            <title>liner notes</title>
        </Head>

        <NavBar status="" session={props.session}></NavBar>
            {/* <input type="text" value={newPostBody} onChange={e => setNewPostBody(e.target.value)} />
            <button onClick={onAdd}>Add</button> */}

                <div className="center">
                    
                <h1 className="home-heading">Add notes to your playlists!</h1>
                <br></br>
                <br></br>
                    <div className="center" 
                        style={{display: "flex", transform: "translate(-50%, 100%)"}}> 
                        <input
                            className="importInput"
                            style={{width:300}} 
                            value={playlistId} 
                            onChange={e => setPlaylistId(e.target.value)}
                            placeholder="Paste in your playlist URL"
                        />
                        <button className="enter-button" onClick={() => navigate(playlistId)} >Import!</button> 
                        {/* want to navigate to corresponding  */}
                        
                
                    </div>
                    <p className="bottomcenter">or, look at <a href={chooseRandomExample()}>liner notes made by others</a></p>
                </div>
         
            

        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext){
    const session = await getSession(context);

    if (!session) return {props: {}};
    
    return {props: {session: session}}
}