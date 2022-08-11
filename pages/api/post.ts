import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { PostModel } from "../../models/post";

export default async function handler(req: NextApiRequest , res : NextApiResponse)
    {
        try {
            console.log(req.body)
            
            if (req.method === "POST" ){
                console.log("is post")
                if (!req.body.body) return res.status(400).send("Missing post body");
                console.log("has post body")
                
                // console.log(process.env.MONGODB_URL)

                await mongoose.connect(process.env.MONGODB_URL as string);
                console.log("connected to mongo")

                console.log(req.body.name, req.body.notes)

                const playlistExists = await PostModel.findOne({ name: req.body.name }).exec();
                if (playlistExists) {
                    return res.status(500).send("Page name already in use.")
                }
                await PostModel.create({body: req.body.body, name: req.body.name, notes: req.body.notes});
                console.log("after create postmodel")
    
                return res.status(200).send("Success");
            } else {
                return res.status(405).send("Method not allowed")
            }
        } catch (e) {
            return res.status(500).send({message: e});
        }
    }
