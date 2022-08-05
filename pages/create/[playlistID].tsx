import axios from "axios";
import { useState, useEffect } from "react";
import {durationFormatter, durationSum} from  "../../utils/utils";
import Track from "../../components/Track";
import NavBar from "../../components/NavBar";
import Head from "next/head";
import { TbSearch, TbUpload, TbDownload } from 'react-icons/tb';
import { BsArrowsExpand, BsArrowsCollapse } from 'react-icons/bs'
import { IconContext } from "react-icons";

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
        const [searchBarVisible, setSearchBarVisible] = useState(false);
        const [search, setSearch] = useState("");
        const [isError, setIsError] = useState(false);

        const [expanded, setExpanded] = useState<boolean[]>([]);
        const [notesArray, setNotesArray] = useState<string[]>([]);

        function exportNotes(){
            let tracksAndNotesArray = ["# " + playlistObject['name'],
                "by: " + playlistObject['owner']['display_name'], 
                "", "---------------"]
            for (let i = 0; i < length; i++){
                const item = playlistObject['tracks']['items'][i]
                tracksAndNotesArray.push((i+1).toString() + ". **" + item['track']['name'] + "** - " + item['track']['artists'][0]['name'])
                tracksAndNotesArray.push("")
                if (notesArray[i]){
                    tracksAndNotesArray.push(notesArray[i])
                    tracksAndNotesArray.push("")
                }

                tracksAndNotesArray.push("---------------")
            }

            const tracksAndNotesStr = tracksAndNotesArray.join("\n")
            console.log(tracksAndNotesStr)

            const element = document.createElement("a");
            const file = new Blob([tracksAndNotesStr], {
            type: "text/plain"
            });
            element.href = URL.createObjectURL(file);
            element.download = playlistObject['name'] + ".md";
            document.body.appendChild(element);
            element.click();
        }

        function setNoteByIndex(i:number, val:string){
            let notesCopy = JSON.parse(JSON.stringify(notesArray));
            notesCopy[i] = val
            setNotesArray(notesCopy)
        }

        function setExpandedByIndex(i:number, val:boolean){
            let expandedCopy = JSON.parse(JSON.stringify(expanded));
            expandedCopy[i] = val
            setExpanded(expandedCopy)
        }

        function expandAll(){
            let newExpanded = []
            for (let i = 0; i < length; i++){
                if (notesArray[i]){
                    newExpanded.push(true)
                } else {
                    newExpanded.push(false)
                }
            }
            setExpanded(newExpanded)
        }
        
        function collapseAll(){
            const newExpanded = new Array(length).fill(false);
            setExpanded(newExpanded)
        }
        
        function checkAllNotesExpanded(){
           for (let i = 0; i < expanded.length; i++){
            if (!expanded[i] && notesArray[i]){
                return false
            } 
           }
           return true
        }

        function checkNoNotes(){
            for (let i = 0; i < notesArray.length; i++){
                if (notesArray[i]){
                    return false
                } 
               }
            return true
        }

        useEffect(() => {

            axios.post("/api/getPlaylist", {
                playlistID: playlistID
                }).then(res => {
                    setPlaylistObject(res.data);
                    const length = res.data['tracks']['items'].length

                    const newExpanded = new Array(length).map(()=>false);
                    setExpanded(newExpanded);

                    const newNotesArray = new Array(length).fill("");
                    setNotesArray(newNotesArray);

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

                            {(checkNoNotes() ? 
                            <></>
                            : 
                                (checkAllNotesExpanded() ? 
                                    <>
                                        <button style={{padding: 5}} onClick={() => collapseAll()}> 
                                        <IconContext.Provider value={{ style: { verticalAlign: 'sub' } }}>
                                            <BsArrowsCollapse/> 
                                        </IconContext.Provider> COLLAPSE ALL </button>
                                    </>
                                    :
                                    <>
                                        <button style={{padding: 5}} onClick={() => expandAll()}> 
                                        <IconContext.Provider value={{ style: { verticalAlign: 'sub' } }}>
                                            <BsArrowsExpand/> 
                                        </IconContext.Provider> EXPAND ALL </button>
                                    </>
                                ) 
                            )
                            }

                            {
                                checkNoNotes() ? <></>:
                                <>
                                    <button style={{padding: 5}} onClick={()=>exportNotes()}> 
                                    <IconContext.Provider value={{ style: { verticalAlign: 'sub' } }}>
                                        <TbDownload/> 
                                    </IconContext.Provider> EXPORT </button>

                                    <button style={{padding: 5}}>
                                    <IconContext.Provider value={{ style: { verticalAlign: 'sub' } }}>
                                        <TbUpload/> 
                                    </IconContext.Provider> PUBLISH </button>
                                </>

                            }
                            

                            

                            
                            


                            <button style={{padding: 5, marginRight: 15}}
                                onClick={() => setSearchBarVisible(!searchBarVisible)}>
                                <IconContext.Provider value={{ style: { verticalAlign: 'sub' } }}>
                                    <TbSearch /> SEARCH
                                </IconContext.Provider> </button>

                            <input className="playlist-search-bar" 
                                style={(searchBarVisible ? {} : {width: 0, borderColor: "transparent"})}
                                type="text" 
                                value={search} 
                                onChange={e => setSearch(e.target.value)} 
                                placeholder="Filter songs..." />


                            {/* {( searchBarVisible ? 
                                <input className="playlist-search-bar" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Filter songs..." />
                            :
                                <></>
                            )} */}
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
                                open={expanded[i]}
                                setOpen={(bool: boolean) => setExpandedByIndex(i, bool)}
                                note={notesArray[i]}
                                setNote={(note: string) => setNoteByIndex(i, note)}
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