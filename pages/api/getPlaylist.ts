import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest , res : NextApiResponse) {
    
        try { 
            const playlistID = req.body.playlistID
            const id_and_secret = process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
            const base64auth = Buffer.from(id_and_secret).toString('base64');
            console.log(base64auth)


            console.log(playlistID)
            console.log(process.env.CLIENT_ID)
            console.log(process.env.BASE64_ENCODED_AUTH_CODE)
            console.log(process.env.CLIENT_SECRET)

            axios({
                url: 'https://accounts.spotify.com/api/token',
                method: 'post',
                data: 'grant_type=client_credentials',
                headers: {
                  Accept:'application/json',
                  'Content-Type': 'application/x-www-form-urlencoded',
                  Authorization: `Basic ${process.env.BASE64_ENCODED_AUTH_CODE}`
                },
                auth: {
                  username: process.env.CLIENT_ID as string,
                  password: process.env.CLIENT_SECRET as string
                }
            }).then(
                tokenres => {
                    console.log("hey i got an access token!")
                    console.log(tokenres.data['access_token'])
                    axios.get(`https://api.spotify.com/v1/playlists/${playlistID}`, {
                    params: { limit: 50, offset: 0 },
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'Bearer ' + tokenres.data['access_token'],
                        'Content-Type': 'application/json',
                    },
                }).then(spotifyres => {
                    console.log("i did get the playlist !")
                    // setPlaylistObject(res.data);
                    console.log(spotifyres.data);
                    return res.status(200).json(spotifyres.data);
                }).catch(e => {
                    console.log("i did not get the playlist !")
                    // setIsError(true)
                    // console.log(e);

                    return res.status(500).send("My deepest condolences sir  i could not get the playlist from Spotify")

                });
            }).catch(e => {
                console.log("i did not get an access token!")
                // setIsError(true)
                console.log(e);
                return res.status(500).send("Could not get access token for Spotify")


            });
    


        } catch(e) {


        }
}
