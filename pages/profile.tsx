import { useEffect, useState } from "react";
import Head from "next/head";
import axios from "axios";
import NavBar from "../components/NavBar";
import { GetServerSidePropsContext } from "next";
import {getSession, signOut} from "next-auth/react";
import PlaylistSummaryCard from "../components/PlaylistSummaryCard";

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

    useEffect(()=> {
        onRequest()
        
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

            <h2>Your playlists</h2>
            <br></br>
            <div style={{display: "flex"}}>
                <div 
                    onClick={()=>{setViewPublished(true)}}
                    style={{width: "50%", cursor: "pointer", color: viewPublished ? "black" : "lightgrey"}}>
                    <b>Published</b>
                </div>
                <div 
                    onClick={()=>{setViewPublished(false)}}
                    style={{width: "50%", cursor: "pointer", color: viewPublished ? "lightgrey" : "black"}}>
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
                                    Preview feature coming soon!
                                </div>
                                </>
                                
                                :
                                <>
                                </>
                            }

                            
                        </>
                            
                        :
                        <>
                        <br></br>
                        <div style={{color: "grey"}}>Loading your playlists...</div>
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
        </div>

        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext){
    const session = await getSession(context);

    if (!session) return {redirect: {permanent: false, destination: "/signin"}}
    
    return {props: {session: session}}
}