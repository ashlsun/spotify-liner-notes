import { useState } from "react";

export default function Track(props: {
    index: number,
    title: string,
    artist: string,
    album: string,
    length: string 
        }
    ) {
    
    const [open, setOpen] = useState(false);

    return (
        <>
        
        <div className="track" 
             onClick={() => setOpen(!open)} 
             style={open ? {
                 backgroundColor: "var(--track-bg)",
                 borderBottomLeftRadius: 0,
                 borderBottomRightRadius: 0,
                 border: "0.5px black dashed",
                 borderBottomWidth: 0
                 } : {}} >
           
                <div className="index">{props.index}</div> 

                <div className="song">
                    <div className="song-title">{props.title}</div> 
                    <div className="artist">{props.artist}</div> 
                </div>

                <div className="album">
                    {props.album}
                </div>

                <div className="length">
                    {props.length}
                </div>


            </div>

            <div className="comment-box" style={{maxHeight: open ? 500 : 0, border: open ? "var(--open-note-border)" : "0px"}}> 

            <br></br>

            here is a placeholder comment for the song {props.title} by {props.artist}!!!!

            <br></br>
            <br></br>
            dsfjkaskldjfasldf
            sdkfjasdkljfadkslf<br></br>
            sdkfjasdkljfadkslf<br></br>
            sdkfjasdkljfadkslf<br></br>
            sdkfjasdkljfadkslf<br></br>
            <br></br>
            <br></br>
            </div>

            {/* {open && (
                <>
                <div className="comment-box" style={{height: open ? 50 : 0}}> here is a placeholder comment for the song {props.title} by {props.artist}!!!!</div>
                <br></br>
                </>
            )} */}
        </>
    )
}