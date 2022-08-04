import axios from "axios";
import { useState, useEffect } from "react";
import {durationFormatter, durationSum} from  "../../utils/utils";
import Track from "../../components/Track";
import NavBar from "../../components/NavBar";
import Head from "next/head";

export async function getServerSideProps(context: any){
    const playlistID = context.params.playlistID;

    return {
        props: {
            playlistID: playlistID
        }
    }
}

export default function PlaylistPage(prop: {playlistID:string}
    )  {
        const playlistID = prop.playlistID

        const [playlistObject, setPlaylistObject] = useState<any>(null);
        const [search, setSearch] = useState("");
        const [isError, setIsError] = useState(false)

        useEffect(() => {

            axios.post("/api/getPlaylist", {
                playlistID: playlistID
                }).then(res => {
                    setPlaylistObject(res.data);
                    console.log(res.data);
                }).catch(e => {
                    setIsError(true)
                    console.log(e);
                });
        }, []);

        return ( 
            <>
            <Head>
                <title>Liner Notes{playlistObject ? ": " + playlistObject['name'] : ""} </title>
            </Head>
            <NavBar status={playlistObject ? '"' + playlistObject['name'] + '"': ""}></NavBar>
            {isError ? 
                <>
                    <div className="center"> 
                        <p>Error: Playlist not found.</p>
                        <p> Did you enter the right link? Is the playlist public?  </p>
                        <br></br>
                        <a href="/" className="underline">return home</a>
                    </div>
                </>  
            : 
                ( playlistObject ?
                    <>
                    <div id="page-header">
                        <img id="playlist-cover" src={playlistObject['images'][0]['url']}/>
                        <div id="playlist-info">
                            <p>{playlistObject['collaborative'] ? "COLLABORATIVE" : "PUBLIC"} PLAYLIST</p>
                            <h1>
                                <a href={playlistObject['external_urls']['spotify']} target="_blank">
                                    {playlistObject['name']}
                                </a>
                            </h1>
                            <p className="desc">{playlistObject['description']}</p>
                            <p>{playlistObject['owner']['display_name']} • {playlistObject['tracks']['total']} songs, 
                            <span className="desc"> {durationFormatter(durationSum(playlistObject))} </span></p>
                            <input className="playlist-search-bar" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter songs..." />
                        </div>
                    </div>
            
                    <div id="tracklist">
                        <div id="tracklist-headings"> 
                            <div className="note-icon"></div>
                            <div className="index"> # </div>
                            <div className="song">TITLE</div> 
                            <div className="album">ALBUM</div>
                            <div className="addedAt">DATE ADDED</div>
                            <div className="length">LENGTH</div>
                        </div>
        
                        <hr style={{color:"grey"}}/>
        
                        {playlistObject['tracks']['items'].map(
                                (item : any, i : number) => (
                        // .filter(
                        //     (d: any) => d['track']['name'].toLowerCase().includes(search.toLowerCase()) || 
                        //     d['track']['artists'][0]['name'].toLowerCase().includes(search.toLowerCase()) || 
                        //     d['track']['album']['name'].toLowerCase().includes(search.toLowerCase())).map(
                        //         (item : any, i : number) => (
                            <Track 
                                key={item['added_at'] + item['track']['id']}
                                addedAt={item['added_at']} 
                                index={i + 1}
                                title={item['track']['name']} 
                                link={item['track']['external_urls']['spotify']}
                                artist={item['track']['artists'][0]['name']} 
                                album={item['track']['album']['name']} 
                                length={durationFormatter(item['track']['duration_ms'])}
                                editable={true} 
                                visible={item['track']['name'].toLowerCase().includes(search.toLowerCase()) || 
                                    item['track']['artists'][0]['name'].toLowerCase().includes(search.toLowerCase()) || 
                                    item['track']['album']['name'].toLowerCase().includes(search.toLowerCase())}
                                note="yes"
                                // setNote={setNoteByIndex}
                            />
                        ))}
                    </div>
                    </> 
                : 
                    
                    (<>  
                        <p className="center"> 
                            Loading...
                        </p>
                    </>) 
                    
                )
            
                
        }
            
    
            </>
        )
    }