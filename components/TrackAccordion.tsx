import Accordion from "./Accordion";

export default function Track(props: {
    index: number,
    addedAt: string,
    title: string,
    link: string,
    artist: string,
    album: string,
    length: string 
 }

    ) {
    return (
    <>
    <Accordion 
        className=""
        open={false}
        label={<Track
                index={props.index}
                addedAt={props.addedAt}
                title={props.title}
                link={props.link}
                artist={props.artist}
                album={props.album}
                length={props.length}
            />}
        >
    
        <p> hI! NEW PLACEHOLDER COMMENT </p>
    </Accordion>
    </>)
}