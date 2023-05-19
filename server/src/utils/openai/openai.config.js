import { Configuration } from "openai"
import * as dotenv from "dotenv";
dotenv.config();

export const configuration = new Configuration({
    organization: process.env.OPENAI_API_ORGANIZATION,
    apiKey: process.env.OPENAI_API_KEY
})

