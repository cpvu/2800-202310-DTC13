import mongoose from "mongoose";

const coinSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    symbol: String,
    amount: Number,
    averagePrice: Number, 
})

const watchlistSchema = new mongoose.Schema({
    _id:  {
        type: String,
        required: true
    }, 
    coin_collection: [coinSchema]        
})

export const userWatchlist = mongoose.model("Watchlist", watchlistSchema);