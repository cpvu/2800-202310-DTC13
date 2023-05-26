import { openaiAPI } from "../utils/openai/openai.js";

//Coin description route to generate data related to the coin
export const postCoinDescription = async (req, res) => {
    const { coin } = req.body;
    try {
        const response = await openaiAPI.createCompletion({
            "model": "text-davinci-003",
            "prompt": `Give me a detailed description of ${coin} in this format: history (Make it detailed), founder, yearFounded, marketCap and currentSentiment as a json.`,
            "max_tokens": 500,
            "temperature": 0,
            "top_p": 1,
            "n": 1,
            "stream": false,
            "logprobs": null,
        })

        const responseJSON = await JSON.parse(response.data.choices[0].text)

        console.log(responseJSON)

        return res.status(200).json(responseJSON);
    } catch (e) {
        console.log(e)
    }
}

//Generate article sentiment route logic
export const postArticleSentiment = async (req, res) => {
    const { newsArticleTitle, coin } = req.body;
    try {
        const response = await openaiAPI.createCompletion({
            "model": "text-davinci-003",
            "prompt": `${newsArticleTitle}. Give me only a sentiment score from 1-5 for ${coin} and indicate it it is positive or negative, In this format : "Positive (3)" Include only my format in your response if it is a different format, then reformat it to my format.`,
            "max_tokens": 500,
            "temperature": 0,
            "top_p": 1,
            "n": 1,
            "stream": false,
            "logprobs": null,
        })

        console.log(response.data)

        return res.status(200).json({ score: response.data.choices[0].text.replace("/n", "").trim() });
    } catch (e) {
        console.log(e)
    }
}

export const postAskQuestion = async (req, res) => {
    try {
        // AI response
        const prompt = req.body.prompt;
        const gptPrompt = `Describe ${prompt} assuming I have no knowledge in this. After you are done, provide me a link to learn more about ${prompt}.`;

        const response = await openaiAPI.createCompletion({
            model: "text-davinci-003",
            prompt: gptPrompt, // The prompt is the text that the AI will use to generate a response.
            temperature: 0, // Higher values means the model will take more risks. (0-1)
            max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
            top_p: 1, // alternative to sampling with temperature, called nucleus sampling
            frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
            presence_penalty: 0, // Number between -2.0 and 2.0. Positive values encourage the model to talk about the subject matter of the prompt that you gave.
        });
        // Send the response back to the client
        res.status(200).send({
            bot: response.data.choices[0].text,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error || "Something went wrong");
    }
};