export async function getServerSideProps(context: any){
    const playlistID = context.params.playlistID;

    return {
        props: {
            playlistID: playlistID
        }
    }
}

export default function PlaylistPage(prop: {playlistID:string}
    )  {

}