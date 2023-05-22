import { userWatchlist } from "../models/watchListSchema.js"

export const getWatchlist = async (req, res) => {
    try {
        const watchlistExists = await userWatchlist.findById({"_id": req.session.user._id});
        
        if (!watchlistExists) {
            await userWatchlist.create({
                _id: req.session.user._id, 
                coin_collection: []
            })
            console.log(`New watchlist created for ${req.session.user.username}`)
        }

        return res.status(200).json({success: true, message: `${req.session.user.username} Watchlist`, collection: watchlistExists.coin_collection})

    } catch (e) {
        console.log(e)
        return res.status(400).json({success: false, message: e.message})
    }
}

export const postAddWatchlist = async (req, res) => {
    try {
    
        const {name, symbol, amount, averagePrice } = req.body;

        const result = await userWatchlist.findByIdAndUpdate(
            req.session.user._id, {$push: {coin_collection: {
                name: name,
                symbol: symbol,
                amount: amount,
                averagePrice: averagePrice
            }}}
        )

        return res.status(200).json({success: true, message: `${name} added to watchlist`})

    } catch (e) {
        console.log(e)
        return res.status(500).json({success: false, message: e.message});
    }
}

export const postRemoveWatchlist = (req, res) => {

}

export const postUpdateWatchlist = (req, res) => {
    
}