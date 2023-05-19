import { openaiAPI } from "../utils/openai/openai.js";

export const getCoinDescription = async (req, res) => {

    try {
        const response = await openaiAPI.createCompletion({
            "model": "text-davinci-003",
            "prompt": "What is crypto?",
            "max_tokens": 400,
            "temperature": 0,
            "top_p": 1,
            "n": 1,
            "stream": false,
            "logprobs": null,
        })

        console.log(response.data.choices[0].text);

        return res.status(200).json({ "text": response.data.choices[0].text });
    } catch (e) {
        console.log(e)
    }
}
export const postAskQuestion = async (req, res) => {
    try {
        // AI response
        const prompt = req.body.prompt;
        const gptPrompt = `Describe ${prompt} in detail assuming I have no knowledge in this.`;

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