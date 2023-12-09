const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const cors = require('cors')
app.use(cors())
app.use(express.json())

app.get('/:prompt', async (req, res) => {
    const prompt = req.params.prompt
    const image = await getImage(prompt)
    res.send(image)
})

const getImage = async (prompt) => {
    const axios = require('axios');

    const options = {
        method: 'POST',
        url: 'https://ai-image-generator3.p.rapidapi.com/generate',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '02c547945amsh56bca4545ab44f2p15a57cjsna1a38178ef5c',
            'X-RapidAPI-Host': 'ai-image-generator3.p.rapidapi.com'
        },
        data: {
            prompt: prompt,
            page: 1
        }
    };

    try {
        const response = await axios.request(options);
        return response.data.results.images[0];
    } catch (error) {
        console.error(error);
    }
}



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})