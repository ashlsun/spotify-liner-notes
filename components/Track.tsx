import { SetStateAction, useState } from "react";
import Accordion from "react-robust-accordion";
import { TbNotes } from 'react-icons/tb';
import { IconContext } from "react-icons";

export default function Track(props: {
    index: number,
    addedAt: string,
    title: string,
    link: string,
    artist: string,
    album: string,
    length: string,
    editable: boolean,
    visible: boolean,
    note: string,
    // setNote: (index: number, note: string) => any,
        }
    ) {
    
    const [openState, setOpenState] = useState(false);
    const [editing, setEditing] = useState(false);
    const [note, setNote] = useState("this is a placeholder note for the song " + props.title + " by " + props.artist)
    const [draft, setDraft] = useState(note)
    const [isHoveringNote, setHoveringNote] = useState(false)
    const [isHoveringExit, setHoveringExit] = useState(false)
    
    const handleDraftChange = (event: { target: { value: SetStateAction<string>; style: { height: string; }; scrollHeight: number; }; }) => {
        // 👇️ access textarea value
        setDraft(event.target.value);
        event.target.style.height = "0px"
        event.target.style.height = event.target.scrollHeight + "px"
      };
    
    const saveDraft = () =>{
        setNote(draft)
    }

    const getNoteHeight = () => {

    }

    return (
        props.visible ? 
        <>
        <Accordion 
            openState={openState}
            setOpenState={setOpenState}
            label={
                <div className="track"
                    style={openState ? {
                            backgroundColor: "var(--track-bg)",
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            border: "0.5px black dashed",
                            borderBottomWidth: 0.5,
                        } : {
                            marginBottom: 10
                        }} >

                    <div className="note-icon">
                        {(props.note ? <>
                            <IconContext.Provider value={{ style: { verticalAlign: 'sub' } }}>
                                <TbNotes/>    
                            </IconContext.Provider>
                            </>
                        : 
                        <></>)}
                        
                        
                    </div>
                    
                    <div className="index">{props.index}</div> 
                    
                    <div className="song">
                        <div className="song-title"> 
                            <a href={props.link} target="_blank"> 
                                {props.title} </a>
                        </div> 
                        <div className="artist">{props.artist}</div> 
                    </div>

                    <div className="album">{props.album}</div>

                    <div className="addedAt">{props.addedAt.split("T")[0]}</div>

                    <div className="length">{props.length}</div>
                </div>} >
        <div className="track-note-container"  
             onMouseEnter={()=>setHoveringNote(true)}
             onMouseLeave={()=>setHoveringNote(false)}> 
        <div className="track-note">
            {!editing ?  
                <>
                    <textarea disabled autoFocus
                        className="viewing" 
                        value={note}
                        name="view-note"></textarea>
                    {props.editable ?
                        <><p style={{opacity: isHoveringNote ? "100%" : "30%",
                                     transition: "all 0.1s ease"}}>
                            <button onClick={() => setEditing(true)}>edit</button>
                        </p></> : <></>
                    }
                
                </>

                :  
                <>
                    <textarea autoFocus
                        onFocus={handleDraftChange}
                        onChange={handleDraftChange}
                        value={draft}
                        name="edit-note"></textarea>
                    <p> 
                        <button onClick={() => saveDraft()}
                                disabled={(draft == note) ? true : false}>save</button>
                        <button onClick={() => {setEditing(false); setDraft(note)}}
                                onMouseMove={() => draft != note ? setHoveringExit(true) : {}}
                                onMouseLeave={() => setHoveringExit(false)}
                                onMouseOut={() => setHoveringExit(false)}
                                onMouseUp={() => setHoveringExit(false)}>exit</button>
    
                         <span style={{
                                opacity: (isHoveringExit && draft != note ? "100%" : "0%"),
                                color: "red", 
                                fontSize: "small", 
                                transition:"all 0.1s ease",
                                userSelect: "none"
                            }}> 
                            you have unsaved changes -- are you sure you want to exit?</span> 
                        
                    </p>
                </> 
            }
        </div> 
        </div>
            
        </Accordion>
        </> : <></>
    )
}