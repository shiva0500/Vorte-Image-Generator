const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (promptObj) => {
  try {
    const response = await openai.createImage({
      prompt: promptObj.text,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });

    const image = response.data.data[0].b64_json;
    console.log(image);
    return image;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

app.post("/generateImage", async (req, res) => {
  const promptObj = req.body.prompt;
  const image = await generateImage(promptObj);
  res.send({ image });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
