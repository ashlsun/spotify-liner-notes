import { useState } from "react";
import { TbLink } from "react-icons/tb"
import { IconContext } from "react-icons";

export default function PublishModal(props: {
    title: string,
    visible: boolean,
    setVisible: (visible: boolean) => any,
    publishFunction: (name: string) => any,
    error: string,
    success: string,
} ) {
    const [url, setUrl] = useState(replaceSpecialCharacters(props.title))
    // const [error, setError] = useState("")

    function replaceSpecialCharacters(str : string) {
        const noSpecialStr = str.replace(/[^a-zA-Z0-9 \-]/g, "");
        const spaceToDashStr = noSpecialStr.replace(/\s/g, "-");
        return spaceToDashStr
    }

    return (
    <>
      <div className="backdrop" style={props.visible ? 
            {"opacity": 1, "pointerEvents": "all"} : 
            {"opacity": 0, "pointerEvents": "none"} }>
        <section className="modal">
        <div className="modal-content">
            PUBLISH LINER NOTES FOR: <h2>{props.title}</h2>
            ~~~~~~~~~~
          <p >Choose a page name: <input 
            maxLength={100} 
            placeholder={replaceSpecialCharacters(props.title)}
            onChange={(e) => setUrl(e.target.value)}></input></p> 
            <br></br>
            <div style={{"color": "rgba(0,0,0,0.4)"}}>After clicking publish, you will be able to access your liner notes at the following link: </div>
            <br></br>
            <br></br>
            <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
                <TbLink/></IconContext.Provider> <a 
                  className="wraplink" 
                  href={"../p/" + replaceSpecialCharacters(url)}
                  target="_blank">liner-notes.vercel.app/p/{replaceSpecialCharacters(url)}</a>
            <br></br>
            <br></br>
            <div style={{"color": "rgba(0,0,0,0.4)"}}>~~~~~~~~~~</div> 
            <div style={{"color": "rgba(0,0,0,0.4)"}}>Note that this feature is still being developed, so you might encounter some bugs. Your pages might move or be deleted.
            <br></br> <br></br>Highly recommend exporting your notes as a backup!
            Also note that this app currently only supports editing after publishing if you have an account! </div>
          <br></br>
          <br></br>
          
            {props.success ? <><p style={{"color": "rgb(100,200,100)"}}>{props.success}</p></> : (props.error ? <><p style={{"color": "rgb(255,0,0)"}}>{props.error}</p></> : <></>)}

            <button onClick={() => props.setVisible(!props.visible)}>close</button>
            <button onClick={() => props.publishFunction(replaceSpecialCharacters(url))}>PUBLISH</button>

          </div>
        </section>
      </div>
    </>)
}