import { useState } from "react";
import { useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import {Routes, Route, useNavigate} from 'react-router-dom';

export default function Index() {
    const [playlistId, setPlaylistId] = useState("")
    const [validInput, setValidInput] = useState(true)
    const [newPostBody, setNewPostBody] = useState("");

    function navigate(input: string){
        let id = "error"
        if (isValidUrl(input)) {
            console.log(input)
            id = getIdFromUrl(input)
        } else if (isValidUri(input)) {
            id = getIdFromUri(input)
        }
        window.location.href= "/"+id

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
    
    return (
        <>
        
        <Head>
            <title>Liner Notes </title>
        </Head>

            <input type="text" value={newPostBody} onChange={e => setNewPostBody(e.target.value)} />
            <button onClick={onAdd}>Add</button>

                <div className="center">
                    <p > Please enter the URL/URI to your Spotify playlist! </p>
                    <div className="center" 
                        style={{display: "flex", transform: "translate(-50%, 100%)"}}> 
                        <input style={{width:300}} 
                            value={playlistId} 
                            onChange={e => setPlaylistId(e.target.value)}
                        />
                        <button onClick={() => navigate(playlistId)} >Enter!</button> 
                        {/* want to navigate to corresponding  */}
                    </div>
                </div>
                    

        </>
    );
}