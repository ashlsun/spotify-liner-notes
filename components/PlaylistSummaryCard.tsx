export default function PlaylistPreview(props: {
    name : string
    body : string
}){

    const playlistObj = JSON.parse(props.body)

    return (
        <>

            <div className="playlist-preview">

                <img style={{maxHeight: 80, border: "dashed 1px grey", padding: 10}}
                    src={playlistObj['images'][0]['url']}/>

                <div style={{marginLeft: 20}}>
                    <p style={{fontFamily: "Zen Maru Gothic", 
                                fontWeight: "bold"}}>
                        <a className="invisible-link" href={"/p/"+props.name}>{playlistObj.name}</a>
                    </p>
                    <p style={{fontSize: "small", color: "grey"}}>{playlistObj['description']}</p>
                
                
                <div className="playlist-preview-button-section">
                    <button>share</button>
                    <button>edit</button>
                    <button>delete</button>
                </div>

                </div>
                
                
            </div>

        </>

    )
}
