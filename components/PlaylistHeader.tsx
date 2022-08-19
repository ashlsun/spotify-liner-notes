import { useState } from "react";
import { TbSearch, TbUpload, TbDownload } from 'react-icons/tb';
import { BsArrowsExpand, BsArrowsCollapse } from 'react-icons/bs'
import { IconContext } from "react-icons";

export default function PlaylistHeader(props: {
    collaborative : boolean,
    link : string,
    name : string,
    coverImage: string,
    description : string,
    ownerDisplayName: string,
    numberTracks: number,
    duration: string,
    noNotes: boolean,
    allNotesExpanded: boolean,
    exportNotes: () => any,
    expandAll: () => any,
    collapseAll: () => any,
    search: string,
    setSearch: (newSearch : string) => any,
}) {
    const [searchBarVisible, setSearchBarVisible] = useState(false)

    return (
        <>
            <div id="page-header">
            <img id="playlist-cover" src={props.coverImage}/>
            <div id="playlist-info">
                <p>{props.collaborative ? "COLLABORATIVE" : "PUBLIC"} PLAYLIST</p>
                <h1>
                    <a className="invisible-link" href={props.link} target="_blank">
                        {props.name}
                    </a>
                </h1>
                <p className="desc">{props.description}</p>
                <p>{props.ownerDisplayName} • {props.numberTracks} songs, 
                <span className="desc"> {props.duration} </span></p>

                {(props.noNotes ? 
                <></>
                : 
                    (!props.allNotesExpanded ? 
                        <>
                            <button style={{padding: 5}} onClick={() => props.expandAll()}> 
                            <IconContext.Provider value={{ style: { verticalAlign: 'sub' } }}>
                                <BsArrowsExpand/> 
                            </IconContext.Provider> EXPAND ALL </button>
                        </>
                        :
                        <>
                            <button style={{padding: 5}} onClick={() => props.collapseAll()}> 
                            <IconContext.Provider value={{ style: { verticalAlign: 'sub' } }}>
                                <BsArrowsCollapse/> 
                            </IconContext.Provider> COLLAPSE ALL </button>
                        </>
                    ) 
                )
                }

                {
                    props.noNotes ? <></>:
                    <>
                        <button style={{padding: 5}} onClick={()=>props.exportNotes()}> 
                        <IconContext.Provider value={{ style: { verticalAlign: 'sub' } }}>
                            <TbDownload/> 
                        </IconContext.Provider> EXPORT </button>


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
                    value={props.search} 
                    onChange={e => props.setSearch(e.target.value)} 
                    placeholder="Filter songs..." />


            </div>
        </div>
        </>
    )
    
}