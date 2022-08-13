import NavBar from "../components/NavBar";
import Accordion from "react-robust-accordion";
import { useState } from "react";



export default function About() {

    return (

        <>
        <NavBar status="about this site"></NavBar>
        <div style={{padding: "10%"}}> 
        <h1>About!</h1>

        <p>Please visit <a href="/help">this page</a> for help with using this site!</p>

        <hr style={{borderTop: "dashed 0.5px;", borderBottom : "0px;"}}/>
        <div className="readable-content">
            <h2>What is this site?</h2>
            <p>Liner Notes is a webapp I'm making to help me add little notes / commentary to my playlists, 
                 in the fashion of '<a href="https://en.wikipedia.org/wiki/Liner_notes">liner notes</a>' 
                that artists will sometimes include in the sleeves of the records they release.
            </p>

        </div>

        <hr style={{borderTop: "dashed 0.5px;", borderBottom : "0px;"}}/>
        <div className="readable-content">

        <h2>Why did I make this?</h2> 

            <p>
                I love making & listening to playlists! &nbsp;( ˘ ɜ˘) ♬♪♫
            </p>
            <p>
                Sometimes when I make playlists for my friends, I'll wish that 
                there was a place for me to express: <em>"I added this because of that one time 
                you said ..."</em>, or <em>"I like the feeling but pls ignore the lyrics"</em>, 
                or <em>"this song reminds me of when we ..."</em>, etc.
            </p>

            <p>
                Sometimes even when I make playlists for myself, I wish I had just 
                a little more expressive power!
            </p>


       
        </div>


        <hr style={{borderTop: "dashed 0.5px;", borderBottom : "0px;"}}/>
        <div className="readable-content">

        <h2>Acknowledgements:</h2>
            
        <p> This project would NEVER have gotten this far
            without the help and presence of these wonderful ppl.  
            THANK YOU to:
        </p>
            <ul>
                <li>
                    <b>Anna</b>, for all our thoughtful convos about music & Spotify! 
                    You were the first to use the phrase "liner notes" 
                    to refer to comments you added to a playlist, and I 
                    totally took that and ran with it. 
                </li>
                <br></br>

                <li>
                    <b>Samson</b>, for all your help in teaching webdev & getting me unstuck! 
                    Your class provided all the structure I needed to get started, 
                    and for the 3 weeks that it ran, 
                    it was honestly one of the highlights of my summer. 
                </li>
                <br></br>

                <li>
                    <b>Tramy</b>, this tool is in large part inspired by the playlists 
                    I made because of you! The process of putting together 
                    A Monday M1Stape and that letter in 2021... 🤔 that's what really got me 
                    thinking in the first place! 
                </li>
                <br></br>

                <li>
                    <b>Brendan</b>, for being my music twin / fellow playlist experimenter! 
                    Thank you for always being interested in what I've been up to
                    and hyping me up throughout the course of this project!
                </li>
                <br></br>

                <li>
                    <b>Pei</b>, thank you for being my first beta tester & takiing the time to point
                    out some pretty major bugs early in the process!! 
                </li>
                <br></br>

                <li>
                    <b>Rowan</b>, for being the first person to really use this tool on 
                    a playlist of your own. When you sent me those screenshots I was so happy!
                    Someone other than me actually wants to use this?!
                </li>
                <br></br>

                <li>
                    <b>Xindi</b> and <b>Sayd</b>, for discussing implementation details & 
                    helping me debug weird React things! 
                    
                </li>
            </ul>

            <p> & to everyone whose given me the space to talk to about this
                thing I've been working on (Aleah, Chris, Krystal, Will, Nicole, Jacinda to name a few, PLUS anyone who's reading this rn 👀) —— I APPRECIATE U!!</p>
        </div>

        <hr style={{borderTop: "dashed 0.5px;", borderBottom : "0px;"}}/>
        
        <h2>Inspiration:</h2>

        </div>
        </>
    )
}