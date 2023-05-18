import { OpenAIApi } from "openai"
import { configuration } from "./openai.config.js";

export const openaiAPI = new OpenAIApi(configuration);