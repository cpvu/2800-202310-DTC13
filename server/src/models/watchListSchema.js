import mongoose from "mongoose";

//Coin schema for information related to coin
const coinSchema = new mongoose.Schema({
    name: {type: String, required: true}, 
    symbol: String,
    amount: Number,
    averagePrice: Number, 
})

// Watchlist schema for Mongo collection containing user watchlists
const watchlistSchema = new mongoose.Schema({
    _id:  {
        type: String,
        required: true
    }, 
    coin_collection: [coinSchema]        
})

export const userWatchlist = mongoose.model("Watchlist", watchlistSchema);