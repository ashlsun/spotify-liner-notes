import Track from "../components/Track";
import tracks from "../data/tracks";

export default function Index() {

    return (
        <>
        
        <div id="page-header">
            <img id="playlist-cover" src="/megatron.png"/>
            <div id="playlist-info">
                <p>PUBLIC PLAYLIST</p>
                <h1>MEGATRON</h1>
                <p className="desc">this is a filler description 
                this is a filler description i made this playlist yesterday i like it quite a bit hopefully i can achieve the layout i want
                 </p>
                <p>Ashley Sun • 13 songs, <span className="desc"> 38 min 29 sec </span></p>
            </div>
        </div>
        
        <div id="tracklist">

        <div id="tracklist-headings"> 
            <div className="index"> # </div>
            <div className="song">TITLE</div> 
            <div className="album">ALBUM</div>
            <div className="length">LENGTH</div>
        </div>

        <hr style={{color:"grey"}}/>

        {tracks.map(d => (
        <Track 
            index={d.index} 
            title={d.title} 
            artist={d.artist} 
            album={d.album} 
            length={d.length} 
        />
        ))}

        <Track 
            index={1} 
            title="component!" 
            artist="Nicki Minaj" 
            album = "MEGATRON" 
            length="3:11"
        />



            <div className="track">
                <div className="index">1</div> 

                <div className="song">
                    <div className="song-title">MEGATRON</div> 
                    <div className="artist">Nicki Minaj</div> 
                </div>

                <div className="album">
                    MEGATRON
                </div>

                <div className="length">
                    3:11
                </div>

            </div>
    
            <div className="track">
                <div className="index">2</div> 

                <div className="song">
                    <div className="song-title">Pseudoscience</div> 
                    <div className="artist">Mudd the student</div> 
                </div>
                <div className="album">
                    Pseudoscience
                </div>

                <div className="length">
                    3:48
                </div>
            </div>

            <div className="track">
                <div className="index">3</div> 

                <div className="song">
                    <div className="song-title">Goalkeeper</div> 
                    <div className="artist">Chinese Football</div> 
                </div>
                <div className="album">
                    Chinese Football
                </div>

                <div className="length">
                    4:12
                </div>
            </div>

            <div className="track">
                <div className="index">4</div> 

                <div className="song">
                    <div className="song-title">First Summer in a City</div> 
                    <div className="artist">Free Cake For Every Creature</div> 
                </div>

                <div className="album">
                    Talking Quietly of Anything with You
                </div>

                <div className="length">
                    2:03
                </div>
            </div>

            </div>
        </>
    );
}
