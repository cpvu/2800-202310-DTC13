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
      
      return res.status(200).json({"text": response.data.choices[0].text });
    } catch (e) {
        console.log(e)
    }
}