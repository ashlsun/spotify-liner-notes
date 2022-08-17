import NavBar from "../components/NavBar";
import { useState } from "react";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import {getSession} from "next-auth/react";




export default function Help(props : {
    session : {
        user : {
            email: string,
            name: string,
            image: string,
        }
    }
}) {
    const [openDetails, setOpenDetails] = useState(false)
    const [openWalkthrough, setOpenWalkthrough] = useState(false)


    return (
        <>
        <Head>
            <title>liner notes: help</title>
        </Head>

        <NavBar status="need help?" session={props.session}></NavBar>


        <div style={{padding: "10%"}}> 
        <div className="mobile-padding"></div>

        <h1>Help!</h1>
        <section id="how-to-use" className="readable-content">
        <br></br>

        <hr style={{borderTop: "dashed 0.5px;", borderBottom : "0px;"}}/>

            <h2 >How to use this site:</h2>
 
            <p>There are 3 steps:</p>
            <ol>
                <li>Import a Spotify playlist.</li>
                <div style={{padding: 30}}>
                    <img style={{maxWidth:"300px", border: "0.5px dashed grey"}} src="importplaylist.gif"/>

                </div>


                <li>Add notes to songs on the playlist.</li>

                <div style={{padding: 30}}>
                    <img style={{maxWidth:"300px", border: "0.5px dashed grey"}} src="addnote.gif"/>

                </div>

                <li>Publish your "liner notes" to share with friends! </li>

                <div style={{padding: 30, maxWidth:"300px"} }>
                    <img style={{ maxWidth:"300px", border: "0.5px dashed grey"}} src="publish.gif"/>
                    <p style={{color:"grey", fontSize: "small"}}>
                        The published example can be viewed at <a href="p/Friends-songs-3">this link!</a>
                    </p>
                </div>
            </ol>

            <p>That's basically it! More features will come when I figure out how to fully integrate user accounts!
            </p>

        </section>
        
        <section id="spotify" className="readable-content">
        <br></br>
        <hr style={{borderTop: "dashed 0.5px;", borderBottom : "0px;"}}/>
        <h2>How does Spotify sign in work / what does it do?</h2>
            <p>
                Spotify sign in works through <a href="https://en.wikipedia.org/wiki/OAuth">OAuth</a>,
                which basically means that this website is outsourcing all the work (of 
                creating / storing / logging-in user accounts) to Spotify. 
            </p>
            <p>
                The purpose of user accounts is to *eventually* allow logged-in users 
                the ability to edit playlists they've already published. The only data I foresee this 
                webapp accessing is the <b>name</b>, <b>user id</b>, and <b>profile pic</b>.
            </p>


            <p>
                Currently, signing in doesn't enable any extra features or do anything really (lol).
            </p>

            <p>
                Feel free to ignore this while I work on making it functional!
            </p>
        </section>


        <section id="how-to-report" className="readable-content">
        <br></br>
        <hr style={{borderTop: "dashed 0.5px;", borderBottom : "0px;"}}/>

        <h2>How to report bugs:</h2>
            <p> You found a bug? Amazing!!! </p>
            <ol style={{fontSize: "normal"}}>
                <li>
                    First, check out <a href="https://docs.google.com/document/d/1WUgI0JgHwenq7gc27hpT-u0-B4gosUstavceNOrCX_A/edit?usp=sharing">this list of known bugs</a>.
                </li>
                    <br></br>
                <li>
                    If it's not in the list yet, 
                    please let me know <a href="https://forms.gle/zMCqtFevazfED4nQ7">here</a>. 
                </li>
            </ol>

            <p>I really appreciate it! :)</p>
            
            
            

        </section>


        <section id="how-to-find" className="readable-content">
        <br></br>
        <hr style={{borderTop: "dashed 0.5px;", borderBottom : "0px;"}}/>

        <h2> How to find the URI / URL of your playlist:</h2>
       
        <p>Finding the URL: make sure that your link is in the format <mark className="wrap-if-mobile">https://open.spotify.com/playlist/XXXXXXXX</mark>.</p>
        <ul>
            <li> If you're using <strong>Spotify Web Player: </strong>
            <div style={{paddingLeft: "2em"}}>the URL is in the address bar of your browser. </div></li>
            <br></br>

            <li>If you're in the <strong>desktop</strong>  or <strong>mobile app:</strong> 
            <div style={{paddingLeft: "2em"}}> find the three dots underneath the playlist header. Click "Share" and then "Copy link to playlist".</div></li>
            {/* <img src="desktop-copy-link.png" style={{position:"relative", padding: 10, width: "50%"}}/>    */}
            <br></br>

        </ul>
        <br></br>
        <p>Finding the URI (<a href="https://en.wikipedia.org/wiki/Uniform_Resource_Identifier">Unique Resource Identifier</a>): this should come in the format <mark>spotify:playlist:XXXXXXXX</mark>.</p>
        <ul>
            <li>On <strong>Web Player</strong> and <strong>Desktop</strong>, click the three dots, hover over "Share" and "Copy link to playlist", and hold down the option/alt key before clicking. The text should change to "Copy Spotify URI".</li>
        </ul>
        <br></br>
        <p>If you still have problems importing your playlist, make sure that your input matches one of the formats highlighted above & check if your playlist is public. Note that a playlist doesn't have to be added to your profile to be public!</p>
        </section>

        <hr style={{borderTop: "dashed 0.5px;", borderBottom : "0px;"}}/>

        <a href="/"> back to home</a>
        
       </div>

        
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext){
    const session = await getSession(context);

    if (!session) return {props: {}};
    
    return {props: {session: session}}
}