export default function Index() {
    return (
        <>

            <h1><em>Hiiii! </em><br/> </h1>
            <h2> My name is Ashley and this is my NEW homepage!            </h2>
            {/* <p> Oooh... you wanna check out my website sooooo bad . . . you want to look around and tell me what you think . . . . . . .</p>  */}

            {/* <br/>
                <br/>
 
               <p> I am 21 years old. I'm a lazy person who likes to draw. <br/>
                I like studying CS bc I spend a lot of time using computers & I feel empowered when I get it. I have also always wanted a website of my own...


                <br/>
                <br/>

                <br/>
                Most recently I've been making lots of <a href="/playlists">playlists</a>, 
                looking at <a href="/trees">trees</a>, 
                and trying to make this website interesting! Pls hang out! </p> */}

            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <filter id="squiggly-0">
                        <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="2" result="noise" seed="0" />
                        <feDisplacementMap id="displacement" in="SourceGraphic" in2="noise" scale="4" />
                    </filter>
                    <filter id="squiggly-1">
                        <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="1" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
                    </filter>

                    <filter id="squiggly-2">
                        <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="2" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
                    </filter>
                    <filter id="squiggly-3">
                        <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="3" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
                    </filter>

                    <filter id="squiggly-4">
                        <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="4" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
                    </filter>
                </defs>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>


                    <filter id="squiggly-0">
                        <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="0" />
                        <feDisplacementMap id="displacement" in="SourceGraphic" in2="noise" scale="6" />
                    </filter>
                    <filter id="squiggly-1">
                        <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="1" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
                    </filter>

                    <filter id="squiggly-2">
                        <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="2" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
                    </filter>
                    <filter id="squiggly-3">
                        <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="3" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
                    </filter>

                    <filter id="squiggly-4">
                        <feTurbulence id="turbulence" baseFrequency="0.02" numOctaves="3" result="noise" seed="4" />
                        <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" />
                    </filter>
                </defs>
            </svg>
        </>
    );
}
