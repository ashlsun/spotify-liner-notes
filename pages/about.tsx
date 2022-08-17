import NavBar from "../components/NavBar";
import { useState } from "react";
import Accordion from "react-robust-accordion";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import {getSession} from "next-auth/react";


export default function About(props : {
    session : {
        user : {
            email: string,
            name: string,
            image: string,
        }
    }
}) {
    const [openWhy, setOpenWhy] = useState(false)
    const [openMisc, setOpenMisc] = useState(false)


    return (
        <>
        <Head>
            <title>liner notes: about</title>
        </Head>

        <NavBar status="about this site" session={props.session}></NavBar>
        <div style={{padding: "10%"}}> 
        <div className="mobile-padding"></div>

        <h1>About!</h1>

        <p>Please visit <a href="/help">this page</a> for help with using this site!</p>

        <hr style={{borderTop: "dashed 0.5px", borderBottom : "0px"}}/>
        <div className="readable-content">
            <h2>What is this site?</h2>
            <p> It's a webapp that lets you add little notes and comments to your playlists!
                The name is inspired by the old practice of artists including '<a href="https://en.wikipedia.org/wiki/Liner_notes">liner notes</a>' 
                in the sleeves of records they released.
            </p>

        </div>

        <hr style={{borderTop: "dashed 0.5px", borderBottom : "0px"}}/>
        <div className="readable-content">

        <h2>Why did I make this?</h2> 

            <p>
                I love making & listening to playlists! &nbsp;( ˘ ɜ˘) ♬♪♫
            </p>
            <p>
                When I make playlists for my friends, I'll often wish that 
                there was a place for me to express things like: 
            </p>
                <ol>
                    <li>
                        <em>"this song reminds me of when we ..."</em>, or
                    </li>
                    <br></br>
                    <li>
                        <em>"i added this bc one time you said ..."</em>, or
                    </li>
                    <br></br>
                    <li>
                        <em>"i like this feeling but lol pls ignore the lyrics"</em>,
                    </li>

                </ol>
            
            <p>    and so on. (<span
                    style={{textDecoration: "underline",
                            cursor: "pointer"}}
                    onClick={()=>setOpenWhy(!openWhy)}>
                        {openWhy ? <>less</> : <>more</>}
                    </span>)
            </p>

            <Accordion openState={openWhy} setOpenState={setOpenWhy}>

            <p>

                <em>Hmmmm</em> I still don't know how to word this well 
                but I just think playlists are an interesting medium!
                They can get pretty ambiguous bc songs have so many
                aspects to them (genre, subject, personality, sound), but in a playlist a song is either included 
                or not... a playlist is an artifact that collapses everything else!
                There is no other axis 
                a song can exist on.
            </p>

            <p>

                I think that this constraint can be 
                part of the fun when it comes to 
                making playlists!

                But sometimes I wish they that my playlists could be a little better
                at carrying / preserving the nuances of all the things I *intend* when 
                I include a song. So here we are.


            </p>


            </Accordion>

       
        </div>


        <hr style={{borderTop: "dashed 0.5px", borderBottom : "0px"}}/>
        <div className="readable-content">

        <h2>Acknowledgements:</h2>
            
        <p>  
            Thank you to:
        </p>
            <ul>
                <li>
                    <b>Anna</b>, for all our thoughtful convos about music & Spotify! 
                </li>
                <br></br>

                <li>
                    <b>Samson</b>, for teaching webdev & answering my q's whenever
                    I got stuck.

                    Your class was honestly one of the highlights of my summer!
                </li>
                <br></br>

                <li>
                    <b>Pei</b>, for being my first beta tester!! 
                </li>
                <br></br>

                <li>
                    <b>Rowan</b>, when you sent me those screenshots I was so happy and encouraged!
                    Someone other than me actually wants to use this?!
                </li>
                <br></br>

                <li>
                    <b>Xindi</b> and <b>Sayd</b>, for
                    helping me debug weird React things! 
                    
                </li>
            </ul>

            <p> & to everyone whose given me the space to talk to about this
                thing I've been working on <span>
                (like <b>Brendan</b>, <b>Aleah</b>, <b>Chris</b>, <b>Ezra</b>, <b>Krystal</b>
                , <b>Nicole</b>, <b>Jacinda</b> to name a few, PLUS 
                anyone who's reading this rn )
                </span> ——I APPRECIATE U!!</p>
        </div>

        <hr style={{borderTop: "dashed 0.5px", borderBottom : "0px"}}/>
        
        <h2>Misc.</h2>
        <div className="readable-content">

        <p>
            Some links & other loosely-related sources of inspiration! It's a lot so I'll
            cut it off here.
                (<span
                    style={{textDecoration: "underline",
                            cursor: "pointer"}}
                    onClick={()=>setOpenMisc(!openMisc)}>
                        {openMisc ? <>less</> : <>more</>}
                    </span>)
        </p>

        

        <Accordion openState={openMisc} setOpenState={setOpenMisc}>
        <ul>
            <li><b>on playlists and the importance of format</b></li>
                <br/>
                <ul>
                    <li>some interesting history <a href="https://www.thebalancecareers.com/liner-notes-2460592">on the rise and decline of liner notes</a></li>
                    
                    <br/>

                    <li>an online <a href="http://albumlinernotes.com/Liner_Note_Samples.html">archive of old album liner notes</a></li>
                    
                    <br/>

                    <li>article on <a href="https://journals.sagepub.com/doi/10.1177/2056305120940690">platform pressures</a> w.r.t. spotify</li>
                    <br/>
                        <ul>
                            <li>kinda related to <a href="https://onezero.medium.com/why-spotify-has-so-many-bizarre-generic-artists-like-white-noise-baby-sleep-c9ce09dc9002">this article about White Noise Baby Sleep on Spotify</a> haha</li>
                        </ul>
                    <br/>

                    <li>no link for this one, but i found Jasper's anthro paper on playlists really illuminating.</li>
                        <br/>

                        <ul>
                            <li>the paper traced through the history of the playlist——from the physical mix tape
                                through the multimedia revolution (e.g. MIDI files, the mp3 format), through platforms like Winamp & iTunes
                                to social streaming services today——showing how changing technologies recontextualize & transform
                                the way we experience and ascribe meaning to cultural artifacts like Music, playlists, songs, etc.  </li>

                                <br/>

                            <li>This quote picked out <a href="https://www.jstor.org/stable/10.1525/j.ctv1xxx9f.7">from Jeremy Wade Morris</a> : 
                            <em>
                            “Winamp was one of the first players to realize that the disaggregation of music from its album actually opened the music commodity up for new forms of aggregation"
                            </em> woaahh ok yeah</li>
                            
                            <br/>
                            <li>He also interviews with people who like making playlists & connects them to interesting concepts:
                                bricolage, subcultural capital, nostalgia, etc. Ultimately it's a fun
                                read: esp when u get that feeling of recognition like wow lol i am IN social phenomena
                                im totally a part of this</li>
                            <br/>

                            <li> if this piqued ur interest too maybe you can reach out to him to read it!</li>

                            <br/>

                        </ul>

                  
                    <li> real life mag always has interesting reads: <a href="https://reallifemag.com/cold-discovery/">Cold Discovery</a> by Drew Austin, <a href="https://reallifemag.com/all-ears/">All Ears</a> by Adam Clair </li>
                </ul>
                <br></br>
            <li><b>on software / platforms</b></li>
                <br/>

                <ul>
                    <li>half-formed thought but although this is a simple webapp, i found the 
                        process of learning how to create one super empowering! bc i think format is magic. 
                    
                        and software is a way of defining formats & inviting others into using them.
                    </li>

                        <br/>


                    <li>a tweet i saw by <a href="https://twitter.com/kytalli/status/1552116139399950338">@kytalli</a> that soorrta gets at this: </li>

                        <br/>

                        <ul>
                            <li>
                                <em>
                                an old tree that has a mature root-mycelial network which supports the germination of fresh seeds. 
                                but what does it mean to develop a mature root-mycelial network for yourself, be an institution ?
                                </em>
                        </li>
                        </ul>
                        

                    <br/>

                    <li>robin sloan: "<a href="https://www.robinsloan.com/notes/home-cooked-app/">an app can be a home cooked meal.</a>" just 
                        hoping friends can use this app & feel the personal-ness of it.
                    </li>

                    <br/>
                    
                    <li>kate compton: <a href="https://computationalcreativity.net/iccc2015/proceedings/10_2Compton.pdf">dissertation on casual creators</a>. 
                        it may be a stretch to call playlist-making a casual creator system, but this is just something i think about all the time. </li>

                    <br/>

                    <li>hannah zeavin: auto-intimacy (thanks to Prof Wing for introducing me to this!) 
                        auto primarily as in self, not auto as in automatic! 
                    </li>
                    <br/>

                        <ul>
                            <li>
                                it's explored more in <a href="https://direct.mit.edu/books/monograph/5162/chapter-abstract/3405087/Auto-Intimacy?redirectedFrom=fulltext">
                                the 4th chapter of "The Distance Cure"</a> but <a href="https://thepolyphony.org/2021/11/26/the-distance-cure-book-review/">
                                here's a short synopsis</a>: <em>'Auto-intimacy' refers to self-communication 
                                enabled through a media object, making the 
                                user both the patient and therapist at once"</em>
                                <br/>
                                <br/>

                                i just think it's a fun (and ACCURATE) framing of what playlists are to me,
                                as i definitely tend to treat them like journals or bookmarks into the past. 
                                and i know im not the only one who sees the 
                                therapeutic / cathartic qualities of putting together a good playlist!
                            </li>
                        </ul>
                </ul>
        </ul>
        </Accordion>
        

        </div>
        <hr style={{borderTop: "dashed 0.5px", borderBottom : "0px"}}/>
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