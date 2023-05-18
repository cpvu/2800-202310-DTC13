import { Configuration } from "openai"

export const configuration = new Configuration({
    organization: process.env.OPENAI_API_ORGANIZATION ,
    apiKey: process.env.OPENAI_API_KEY 
})

