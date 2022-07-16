import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { PostModel } from "../../models/post";

export default async function handler(req: NextApiRequest , res : NextApiResponse)
    {
        try {
            if (req.method === "POST" ){
                // console.log("is post")
                if (!req.body.body) return res.status(400).send("Missing post body");
                // console.log("has post body")
                
                console.log(process.env.MONGODB_URL)

                await mongoose.connect(process.env.MONGODB_URL as string);
                // console.log("connected to mongo")

                await PostModel.create({body: req.body.body});
                // console.log("after create postmodel")
    
                return res.status(200).send("Success");
            } else {
                return res.status(405).send("Method not allowed")
            }
        } catch (e) {
            return res.status(500).send({message: e});
        }
    }
