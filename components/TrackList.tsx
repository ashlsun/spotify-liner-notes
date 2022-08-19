import Track from "./Track";
import {durationFormatter} from  "../utils/utils";

export default function TrackList(props: {
    items: any[],
    search: string,
    expanded: boolean[],
    setExpanded: (newExpanded : boolean[]) => any,
    notesArray: string[],
    setNotesArray: (newNotesArray: string[]) => any
} 
) {
    function setNoteByIndex(i:number, val:string){
        let notesCopy = JSON.parse(JSON.stringify(props.notesArray));
        notesCopy[i] = val
        props.setNotesArray(notesCopy)
    }

    function setExpandedByIndex(i:number, val:boolean){
        let expandedCopy = JSON.parse(JSON.stringify(props.expanded));
        expandedCopy[i] = val
        props.setExpanded(expandedCopy)
    }

    return (
        <>
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

            {props.items.map(
                (item : any, i : number) => (

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
                        visible={item['track']['name'].toLowerCase().includes(props.search.toLowerCase()) || 
                            item['track']['artists'][0]['name'].toLowerCase().includes(props.search.toLowerCase()) || 
                            item['track']['album']['name'].toLowerCase().includes(props.search.toLowerCase())}
                        open={props.expanded[i]}
                        setOpen={(bool: boolean) => setExpandedByIndex(i, bool)}
                        note={props.notesArray[i]}
                        setNote={(note: string) => setNoteByIndex(i, note)}
                    />
                )
            )}
        
        </div>
        </>
    )
    
}