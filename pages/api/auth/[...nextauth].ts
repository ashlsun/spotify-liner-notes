import NextAuth from "next-auth/next";
import SpotifyProvider from "next-auth/providers/spotify";

export default NextAuth({
    providers: [
        SpotifyProvider({
            clientId: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRET as string,
            profile(profile) {
                return {
                    id: profile.id,
                    name: profile.display_name,
                    email: profile.email,
                    image: profile.images?.[0]?.url
                }
            }

        })
    ]
})