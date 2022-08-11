import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { PostModel } from "../../models/post";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try{
        if (req.method === "POST" ) {
            await mongoose.connect(process.env.MONGODB_URL as string);

            if (!req.body.page_name) {
                return res.status(400).send("Missing request body");
            }

            const playlist = await PostModel.findOne({ name: req.body.page_name }).exec();

            return res.status(200).json(playlist);

        } else {
            return res.status(405).send("Method not allowed");
        }
    } catch (e) {
        return res.status(500).json({message: e})
    }
}