import dbConnect from "../../../utils/mongo";
import Product from "../../../models/Product";

export default async function handler(req, res) {
    const {
        method,
        query: {id}
    } = req

    dbConnect()
        .then(() => console.log("Connected"))
        .catch((e)=> console.log(e.message))

    if(method === "GET") {
        try {
            const product = await Product.findById(id)
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    if(method === "PUT") {
        try {
            const product = await Product.findByIdAndUpdate(
                id, req.body, {
                    new: true
                }
            )
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json(err)
        }
    }

    if(method === "DELETE") {
        console.log(req)
        try {
            await Product.findByIdAndDelete(id)
            res.status(200).json("The product has been deleted")
        } catch (err) {
            res.status(500).json(err)
        }
    }
}