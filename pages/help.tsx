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
                    <img 
                        style={{maxWidth:"300px", border: "0.5px dashed grey"}} 
                        src="importplaylist.gif"
                        alt="Screen recording gif starting on the homepage, where a user pastes a link into 
                        a text field and clicks the Enter button next to it.
                        Then, the imported playlist is displayed on the screen."/>

                </div>


                <li>Add notes to songs on the playlist.</li>

                <div style={{padding: 30}}>
                    <img 
                        style={{maxWidth:"300px", border: "0.5px dashed grey"}} 
                        src="addnote.gif"
                        alt="Screen recording gif starting on a list of tracks in
                        a playlist. User clicks a track and it expands vertically, 
                        revealing a create button. User clicks create and a text
                        field appears, where user types a note and clicks the save buttom."/>

                </div>

                <li>Publish your "liner notes" to share with friends! </li>

                <div style={{padding: 30, maxWidth:"300px"} }>
                    <img 
                        style={{ maxWidth:"300px", border: "0.5px dashed grey"}} 
                        src="publish.gif"
                        alt="Screen recording gif where user clicks the publish button
                        on a playlist page, where a popup modal appears. User clicks 
                        the publish button on the modal and is redirected to a new page,
                        which displays all the notes in a view only layout."/>
                    <p style={{color:"grey", fontSize: "small"}}>
                        The published example can be viewed at <a href="p/Friends-songs-3">this link!</a>
                    </p>
                </div>
            </ol>

            <p>
                That's all the basics!      
            </p>
            <p>
                There are a few more features that come with user accounts
                , like a view of all the pages you've made, setting privacy permissions,
                 editing, and more! You can access 
                your personal page by clicking the circle on the top right corner of the screen.
                </p>
            <p>
                Here's how that looks like:
            </p>


            <img 
                style={{ maxWidth:"500px", border: "0.5px dashed grey"}} 
                src="profilepage.gif"
                alt="Screen recording gif demonstrating the profile page,
                viewing past playlist pages. "/>

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


        <section id="spotify" className="readable-content">
        <br></br>
        <hr style={{borderTop: "dashed 0.5px;", borderBottom : "0px;"}}/>
        <h2>How does Spotify sign in work / what does it do?</h2>
            <br></br>

            <h3>How it works</h3>
            <p>
                Spotify sign in works through <a href="https://en.wikipedia.org/wiki/OAuth">OAuth</a>,
                meaning that instead of having a separate login system,
                this webapp asks Spotify for permission to access data like
                your <b>user id</b>, <b>name</b>, <b>email</b>, and <b>profile pic</b>. These are the only fields it 
                needs; it's not accessing any other data from your account!
            </p>

            <br></br>

            <h3>What it's for</h3>
            <p>
                Signed-in users can view, edit, and delete the playlists
                they've published on this site. They can also set custom viewing & editing permissions 
                for others, so you could, for example: collaboratively comment on a playlist
                or make a playlist page visible for only certain users.
            </p>


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
            <div style={{paddingLeft: "2em"}}> find the "More options" button (the three dots underneath the playlist header). Click "Share" and then "Copy link to playlist".</div></li>
            {/* <img src="desktop-copy-link.png" style={{position:"relative", padding: 10, width: "50%"}}/>    */}
            <br></br>

        </ul>
        <br></br>
        <p>Finding the URI (<a href="https://en.wikipedia.org/wiki/Uniform_Resource_Identifier">Unique Resource Identifier</a>): this should come in the format <mark>spotify:playlist:XXXXXXXX</mark>.</p>
        <ul>
            <li>On <strong>Web Player</strong> and <strong>Desktop</strong>, click the more options button (three dots), hover over "Share" and "Copy link to playlist", and hold down the option/alt key before clicking. The text should change to "Copy Spotify URI".</li>
        </ul>
        <br></br>
        <p>If you still have problems importing your playlist, make sure that your input matches one of the formats highlighted above & check that your playlist is public. Note that a playlist doesn't have to be added to your profile to be public!</p>
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