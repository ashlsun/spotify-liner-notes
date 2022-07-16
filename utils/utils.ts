export function isValidURI(uri: string){
    return (uri.match("spotify:playlist:")) 
}

export function getPlaylistBasedOnURI(uri: string){
    return uri.split(":")[2]
}

export function durationSum(playlistObject : any){
    let sum_ms = 0;
    for (const i in playlistObject['tracks']['items']){
        // console.log(i)
        const item = playlistObject['tracks']['items'][i]
        sum_ms = sum_ms + item['track']['duration_ms']
        // console.log(sum_ms)
        // console.log(durationFormatter(sum_ms))
    }
    return sum_ms;
}

export function durationFormatter(ms: number) {
    // const msecs = Math.floor(ms % 1000);
    const secs = Math.floor((ms / 1000) % 60)
    const mins = Math.floor((ms / (1000 * 60)) % 60)
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60)
    let durationString = ""
    if (hrs) {
        durationString = hrs.toString() + "h "
    }
    if (mins) {
        durationString = durationString + mins.toString() + "m "
        
    // } else {
    //     durationString = durationString + "0m "
    }
    if (secs) {
        durationString = durationString + secs.toString() + "s "
    }
    return durationString
}


