import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { PostModel } from "../../models/post";
import { getSession } from "next-auth/react";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET"){
            const session = await getSession({req})

            await mongoose.connect(process.env.MONGODB_URL as string);

            const posts = await PostModel.find({ email : session?.user?.email})
            // const posts = await PostModel.aggregate([
            //     {
            //         $lookup: {
            //             from: "users",
            //             foreignField: "_id",
            //             localField: "userId",
            //             as: "user"
            //         }
            //     },
            //     { $unwind: "$user"},
            // ]);

            return res.status(200).json({posts: posts});
        } else if (req.method === "DELETE") {
            
            if (!req.body.id) return res.status(400).send("Missing post ID")
            
            const session = await getSession({req});
            const emailObject = await PostModel.findById(req.body.id, "email")
            const email = emailObject.email
            
            if (!session) {
                return res.status(403).send("Not logged in")
            }
            else if (!email) {
                return res.status(403).send("Playlist does not have an owner")

            } else if (email != session?.user?.email) {
                return res.status(403).send("Not the owner of the playlist")
            } 

            await mongoose.connect(process.env.MONGODB_URL as string)
            await PostModel.deleteOne({_id: req.body.id})

            return res.status(200).send("Success");
        } else {
            return res.status(405).send("Method not allowed");
        }
    } catch (e) {
        return res.status(500).json({message: e});
    }
}