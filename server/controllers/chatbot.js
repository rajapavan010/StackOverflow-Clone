import dotenv from "dotenv";
import * as openai from 'openai';

dotenv.config();

const apiKey = "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";

if (!apiKey) {
  throw new Error("The OPENAI_API_KEY environment variable is missing or empty. Please provide a valid API key.");
}

export const chatbotController = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.Completion.create({
      engine: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0,
      apiKey: apiKey,
    });

    res.status(200).json({
      message: response.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json("Something went wrong...");
  }
};
