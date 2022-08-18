export default function PlaylistPreview(props: {
    name : string
    body : string
}){

    const playlistObj = JSON.parse(props.body)

    return (
        <>
            <a className="invisible-link" href={"/p/"+props.name}>

            <div style={{padding: 20, 
                         border: "dashed 1px grey",
                         borderRadius: 5,
                         marginTop: 20,
                         display: "flex"}}>

                <img style={{maxHeight: 100, border: "dashed 0.5px black"}}
                    src={playlistObj['images'][0]['url']}/>

                <div style={{marginLeft: 20}}>
                    <p style={{fontFamily: "Zen Maru Gothic", 
                                fontWeight: "bold"}}>
                        <a className="invisible-link" href={"/p/"+props.name}>{playlistObj.name}</a>
                    </p>
                    <p style={{fontSize: "small", color: "grey"}}>{playlistObj['description']}</p>
                </div>
            </div>
            </a>

        </>

    )
}
