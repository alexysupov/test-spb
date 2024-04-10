import { verifyToken } from "../utils/index.js";
import fs from "fs/promises";
import multer from "multer";
import {v4 as uuid} from "uuid";

export const authorization = async (req, res, next) => {
    const accessToken = req.cookies['X-Access-Token']

    if (!accessToken) {
        return res.status(403).json({
            message: 'Not authorize'
        })
    }

    try {
        req.userId = await verifyToken(accessToken).then(_ => _.userId)
        next()
    }
    catch (e) {
        return res.status(401).json({
            message: e.message
        })
    }
}

export const identification = async (req, res, next) => {
    const accessToken = req.cookies['X-Access-Token']

    try {
        req.userId = await verifyToken(accessToken).then(_ => _.userId)
        next()
    }
    catch (e) {
        req.userId = null
        next()
    }
}

export const uploadFile = (destination = 'uploads') => {
    const storage = multer.diskStorage({
        destination: async (req, file, cb) => {
            try {
                await fs.access(destination)
            } catch (e) {
                await fs.mkdir(destination)
            } finally {
                cb(null, destination)
            }
        },
        filename: (req, file, cb) => {
            const extension = file.originalname.split('.').pop()
            const filename = uuid() + '.' + extension
            cb(null, filename)
        }
    })

    return multer({ storage })
}

export const avatarMiddleware = [uploadFile().single('image')]