import { userWatchlist } from "../models/watchListSchema.js"

//Get watchlist route logic
export const getWatchlist = async (req, res) => {
    try {
        const watchlistExists = await userWatchlist.findById({"_id": req.session.user._id});

        // Check if watchlist exists, if not creates a new entry for user
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
        
        //Check if coin exists in user's collection
        const coinExists = await userWatchlist.findOne({
            $and:[
                {_id: req.session.user._id},
                { coin_collection: { $elemMatch: { symbol: symbol } } }
            ]
        })

        //End response if coin is already in the user's collection
        if (coinExists) {
            return res.status(200).json({success: false, message: "Coin already exists in watchlist!"})
        }

        //Update user's collection with new coin
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

