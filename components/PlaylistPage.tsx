import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import {durationFormatter, durationSum} from  "../utils/utils";
import PlaylistHeader from "./PlaylistHeader";
import axios from "axios";
import TrackList from "./Tracklist";

export default function PlaylistPage(props: {
    playlistObject : any, // TODO : fix type
    notesArray: string[],
    setNotesArray: (newNotesArray: string[]) => any
    session : {
        user : {
            email: string,
            name: string,
            image: string,
        }
    }
}) {
    const [isError, setIsError] = useState(false)
    const [expanded, setExpanded] = useState<boolean[]>([]);
    const [search, setSearch] = useState("");


    function exportNotes(){
        if (!props.playlistObject) {
            return
        }
        let tracksAndNotesArray = ["# " + props.playlistObject['name'],
            "by: " + props.playlistObject['owner']['display_name'], 
            "", "---------------"]
        for (let i = 0; i < length; i++){
            const item = props.playlistObject['tracks']['items'][i]
            tracksAndNotesArray.push((i+1).toString() + ". " + item['track']['name'] + " - " + item['track']['artists'][0]['name'])
            tracksAndNotesArray.push("")
            if (props.notesArray[i]){
                tracksAndNotesArray.push(props.notesArray[i])
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
        element.download = props.playlistObject['name'] + ".txt";
        document.body.appendChild(element);
        element.click();
    }

    function setNoteByIndex(i:number, val:string){
        let notesCopy = JSON.parse(JSON.stringify(props.notesArray));
        notesCopy[i] = val
        props.setNotesArray(notesCopy)
    }

    function setExpandedByIndex(i:number, val:boolean){
        let expandedCopy = JSON.parse(JSON.stringify(expanded));
        expandedCopy[i] = val
        setExpanded(expandedCopy)
    }

    function expandAll(){
        let newExpanded = []
        for (let i = 0; i < length; i++){
            if (props.notesArray[i]){
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
        for (let i = 0; i < props.notesArray.length; i++){
        console.log("exp", expanded[i])
        console.log("notes", props.notesArray[i])

        if (!expanded[i] && props.notesArray[i]){
            return false
        } 
        }
        return true
    }

    function checkNoNotes(){
        for (let i = 0; i < props.notesArray.length; i++){
            if (props.notesArray[i]){
                return false
            } 
        }
        return true
    }
    return (
        <>
        

        <NavBar status={props.playlistObject ? '"' + props.playlistObject['name'] + '"': ""}
                session={props.session}/>

        <PlaylistHeader
            collaborative={props.playlistObject['collaborative']}
            link={props.playlistObject['external_urls']['spotify']}
            name={props.playlistObject['name']}
            coverImage={props.playlistObject['images'][0]['url']}
            description={props.playlistObject['description']}
            ownerDisplayName={props.playlistObject['owner']['display_name']}
            numberTracks={props.playlistObject['tracks']['total']}
            duration={durationFormatter(durationSum(props.playlistObject))}
            noNotes={checkNoNotes()}
            allNotesExpanded={checkAllNotesExpanded()}
            exportNotes={()=>exportNotes()}
            expandAll={()=>expandAll()}
            collapseAll={()=>collapseAll()}
            search={search}
            setSearch={(newSearch) => setSearch(newSearch)}
        />


        <TrackList
            items={props.playlistObject['tracks']['items']}
            search={search}
            expanded={expanded}
            setExpanded={(newExpanded: boolean[])=>setExpanded(newExpanded)}
            notesArray={props.notesArray}
            setNotesArray={(newNotesArray: string[]) => props.setNotesArray(newNotesArray)}
        />

        </>
    )
    
}