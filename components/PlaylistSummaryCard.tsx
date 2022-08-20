import { AnyTxtRecord } from "dns"

export default function PlaylistSummaryCard(props: {
    name : string,
    body : string,
    deleteRequest : () => any,
    thisSelected : boolean,
    setThisSelected : () => any
}){

    const playlistObj = JSON.parse(props.body)
    
    function deleteCheck() {
        const warning = 'Delete "' + playlistObj.name + '"? This action cannot be undone!'
        if (confirm(warning)){
            props.deleteRequest()
        } else {
            // do nothing
        }
    }

    function copyLink() {
        navigator.clipboard.writeText("https://liner-notes.vercel.app/p/" + props.name)
        alert('Copied the link to "' + playlistObj.name + '" to your clipboard!');
    }

    return (
        <>

            <div className="playlist-preview"
                 style={props.thisSelected ? {
                            backgroundColor: "rgba(0,0,0,0.2)",
                            border: "dashed 1px black"
                        } : {}}
                 onClick={()=>props.setThisSelected()}>

                <img style={{maxHeight: 80, border: "dashed 1px grey", padding: 10}}
                    src={playlistObj['images'][0]['url']}/>

                <div style={{marginLeft: 20}}>
                    <p style={{fontFamily: "Zen Maru Gothic", 
                                fontWeight: "bold"}}>
                        <a className="invisible-link" href={"/p/"+props.name}>{playlistObj.name}</a>
                    </p>
                    <p style={{fontSize: "small", color: props.thisSelected ? "black" : "grey"}}>{playlistObj['description']}</p>
                
                
                <div className="playlist-preview-button-section">
                    <button 
                        onClick={()=>copyLink()}
                        style={props.thisSelected ? {color: "black", borderColor: "black"} : {}}>
                            share
                    </button>

                    <button 
                        onClick={()=>{}}
                        style={props.thisSelected ? {color: "black", borderColor: "black"} : {}}>
                            edit
                    </button>

                    <button 
                        onClick={()=>deleteCheck()}
                        style={props.thisSelected ? {color: "black", borderColor: "black"} : {}}>
                            delete
                    </button>

                </div>

                </div>
                
                
            </div>

        </>

    )
}
