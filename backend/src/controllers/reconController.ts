import { Request, Response } from "express";
import { error } from "node:console";

export const startRecon =(req: Request, res: Response) =>{

    const {target} = req.body

    if(!target){
        return res.status(400).json({error:"Target URL is required"})
    }
    
    return res.json({
        ok: true,
        received: target, 
    })
}