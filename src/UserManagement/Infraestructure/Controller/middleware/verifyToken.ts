import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IncomingHttpHeaders } from 'http';
import { JWT } from "../../dependencies";

export async function VerifyToken(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers as IncomingHttpHeaders;
    const authHeader = headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    const token = authHeader.split(' ')[1];
   
    if (!process.env.SECRET) {
        return res.status(500).json({ message: 'JWT secret not configured' });
    }

    if (await JWT.isTokenRevoked(token)) {
        return res.status(401).json({ message: 'Token is revoked' });
    }else{
        try {
            jwt.verify(token, process.env.SECRET);
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
    
}