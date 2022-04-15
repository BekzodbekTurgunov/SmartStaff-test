import {Request, Response} from 'express'

export const getProducts = (req: Request, res: Response) => {
    res.send('getProducts')
}

export const postProduct = (req: Request, res: Response) => {
    res.send('postProduct');
}

export const updateProduct = (req: Request, res: Response) => {
    res.send('updateProduct');
}

export const deleteProduct = (req: Request, res: Response) => {
    res.send('deleteProduct');
}   

