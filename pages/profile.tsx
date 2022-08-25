import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import NavBar from "../components/NavBar";
import { GetServerSidePropsContext } from "next";
import {getSession, signOut} from "next-auth/react";
import PlaylistSummaryCard from "../components/PlaylistSummaryCard";
import TrackList from "../components/TrackList";
import Track from "../components/Track";

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
    const [viewShared, setViewShared] = useState(true)
    const [selected, setSelected] = useState<boolean[]>([])
    const [selectedPlaylistObj, setSelectedPlaylistObj] = useState<any>(null)
    const [selectedExpanded, setSelectedExpanded] = useState<boolean[]>([])
    const [selectedNotesArray, setSelectedNotesArray] = useState<string[]>([])

    // function getSelectedItems(){
    //     const index = findSelected()
    //     const playlistObj = JSON.parse(posts[index].body)
    //     console.log(playlistObj)
    //     return playlistObj.tracks.items
    // }

    function selectByIndex(val: boolean, i: number) {
        const selectedArray = new Array(posts.length).fill(false);
        selectedArray[i] = val;
        setSelected(selectedArray)
    }

    function checkAnySelected(){
        for (let i = 0; i < selected.length ; i++){
            if (selected[i]){
                return true
            }
        }
        return false
    }

    function onDelete(id: string){
        axios.delete("api/myPlaylists", {data: {id: id}}).then(() => {
            onRequest();
        }).catch(e => console.log(e))
    }

    function onRequest() {
        axios.get("api/myPlaylists").then(res=> {
            console.log("yey", res.data)
            setPosts(res.data.posts)
            const selectedArray = new Array(res.data.posts.length).fill(false);
            setSelected(selectedArray)
            setLoadingPublished(true)
        }).catch(e => console.log(e))
    }

    function findSelected(){
        for (let i = 0; i < selected.length; i++){
            if (selected[i]){
                return i
            }
        }
        return -1
    }

    function countNotes(){
        let noteCounter = 0
        for (let i = 0; i < selectedNotesArray.length; i++){
            if (selectedNotesArray[i]){
                noteCounter++
            }
        }
        return noteCounter
    }

    useEffect(()=> {
        onRequest()
    }, []);

    useEffect(() => {
        const index = findSelected()
        if (index > -1){
            const playlistObj = JSON.parse(posts[index].body)
            setSelectedPlaylistObj(playlistObj)
            const newExpanded = new Array(playlistObj.tracks.items.length).map(()=>false);
            setSelectedExpanded(newExpanded)
            const existingNotes = posts[index].notes
            setSelectedNotesArray(existingNotes)
        }
    }, [selected])

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

            <h2>Your playlists</h2>
            <br></br>
            <div style={{display: "flex"}}>
                <div 
                    onClick={()=>{setViewPublished(true)}}
                    style={{width: "20%", cursor: "pointer", color: viewPublished ? "black" : "lightgrey"}}>
                    <b>Published</b>
                </div>
                <div 
                    onClick={()=>{setViewPublished(false)}}
                    style={{width: "20%", cursor: "pointer", color: viewPublished ? "lightgrey" : "black"}}>
                    <b>Drafts</b>
                </div>
            </div>
            
            
            
            <div style={{display: viewPublished ? "" : "none"}}>
                <div style={{display: "flex"}}> 
                    
                    {loadingPublished ? 
                        <>
                            <div className="playlist-preview-list">
                                {posts.map((d ,i: number)=> (
                                    <>
                                    <PlaylistSummaryCard 
                                        key={d._id} 
                                        name={d.name} 
                                        body={d.body}
                                        thisSelected={selected[i]}
                                        setThisSelected={() => selectByIndex(!selected[i], i)}
                                        deleteRequest={()=>onDelete(d._id)}
                                    />
                                    </>
                                ))}
                            </div>
                            
                            {
                                checkAnySelected() ? 

                                <>
                                <div className="vertical-line"></div> 
                                <div className="playlist-preview-page">
                                    <br/>
                                    <br/>
                                    <h1 style={{textAlign: "center"}}>{selectedPlaylistObj ? selectedPlaylistObj.name : ""}</h1>
                                    <br></br>
                                    <h2>Overview</h2>

                                    <br></br>
                                    <div>
                                    <div> 
                                        This playlist has notes on  <b>{countNotes()}/{selectedPlaylistObj ? selectedPlaylistObj.tracks.items.length : <></>} </b> songs!
                                    </div>
                                    <br></br>
                                    
                                    <div className="wraplink">Link to <b>Spotify</b> playlist: 
                                        <br></br>
                                        &nbsp;&nbsp;&nbsp;&nbsp; <a href={selectedPlaylistObj ? selectedPlaylistObj.external_urls.spotify : ""}>{selectedPlaylistObj ? selectedPlaylistObj.external_urls.spotify : ""}</a></div>
                                    <br></br>
                                    <div className="wraplink">Link to <b>liner notes</b> page: 
                                        <br></br>
                                        &nbsp;&nbsp;&nbsp;&nbsp; <a href={"liner-notes.vercel.app/p/" + posts[findSelected()].name}>liner-notes.vercel.app/p/{posts[findSelected()].name}</a> </div>
                                    <br></br>
                                    <div> 
                                        It is <b>viewable</b> by: <b>Everyone </b>
                                    </div>
                                    <br></br>
                                    <div> 
                                        It is <b>editable</b> by: <b>Only you </b>
                                    </div>

                                    <br></br>

                                    <div style={{fontSize: "small", color: "rgba(0,0,0,0.5)"}}>(You can edit the above settings by clicking the [edit] button on the left.)</div>

                                    </div>

                                    <br></br>

                                    <hr style={{borderTop: "dashed 1px", borderBottom : "0px"}}/>

                                    <h2>Tracklist + notes</h2>

                                    
                                    {selectedPlaylistObj ? selectedPlaylistObj.tracks.items.map((item: any, i: number) => (
                                         <>
                                            <p>{i+1}. <b>{item.track.name}</b> -  {item['track']['artists'][0]['name']} </p>
                                            <p className="readable-content"
                                                style={{color: "rgba(0,0,0,0.5)"}}>
                                                    {selectedNotesArray[i]}
                                            </p>
                                            <hr style={{borderTop: "dashed 1px", borderBottom : "0px"}}/>

                                         </>
                                     )) 
                                     : 
                                     <></>}
                                

                                    

                                </div>
                                </>
                                
                                :
                                <>
                                </>
                            }

                            
                        </>
                            
                        :
                        <>
                        <div>
                        <br></br>
                        <br></br>
                            <div style={{color: "grey"}}>Loading your playlists...</div>

                        <br></br>
                        <br></br>
                        <br></br>
                        </div>
                        
                        
                        </>
                        }

                </div>
                
                
                
            <br></br>


            </div>

            <div style={{display: viewPublished ? "none" : ""}}>
                    <br/>
                    <br/>
                    <div style={{color: "grey"}}>Drafts feature coming soon!</div>
                    <br/>                    
                    <br/>
                    <br/>
                    <br/>
            </div>
            
            <hr style={{borderTop: "dashed 0.5px", borderBottom : "0px"}}/>

            <h2>Other people's playlists</h2>
            <br></br>

            <div style={{display: "flex"}}>
                <div 
                    onClick={()=>{setViewShared(true)}}
                    style={{width: "50%", cursor: "pointer", color: viewShared ? "black" : "lightgrey"}}>
                    <b>Shared with you</b>
                </div>
                <div 
                    onClick={()=>{setViewShared(false)}}
                    style={{width: "50%", cursor: "pointer", color: viewShared ? "lightgrey" : "black"}}>
                    <b>Shared with everyone</b>
                </div>
            </div>


            <br/>
            <br/>
            <div style={{color: "grey"}}>Sharing feature coming soon!</div>
            <br/>                    
            <br/>
            <br/>
            <br/>

        </div>



        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext){
    const session = await getSession(context);

    if (!session) return {redirect: {permanent: false, destination: "/signin"}}
    
    return {props: {session: session}}
}