import { useState } from "react";
import Accordion from "react-robust-accordion";

export default function Track(props: {
    index: number,
    addedAt: string,
    title: string,
    link: string,
    artist: string,
    album: string,
    length: string 
        }
    ) {
    
    const [openState, setOpenState] = useState(false);

    return (
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
                            borderBottomWidth: 1
                        } : {
                            marginBottom: 5
                        }} >
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
            
            
            <div className="track-note"> note box </div>
        </Accordion>
        </>
    )
}