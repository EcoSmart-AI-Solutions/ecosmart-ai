import { type Request, type Response } from 'express';

export async function scanWaste(_req: Request, res: Response) {
    return res.status(501).json({
        success: false,
        message: 'Waste scanning is not implemented yet',
    });
}

export async function getWasteHistory(_req: Request, res: Response) {
    return res.status(200).json({
        success: true,
        data: [],
    });
}
