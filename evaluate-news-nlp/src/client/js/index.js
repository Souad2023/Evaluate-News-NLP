const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");


dotenv.config(); 

const app = express();


const apiKey = process.env.API_KEY;


if (!apiKey) {
    console.error("API_KEY is missing. Please check your .env file.");
    process.exit(1); 
}

const port = 5050;


app.use(express.static('dist'));
app.use(bodyParser.json());


app.post("/analyze", async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required." });
    }

    try {
        const data = { key: apiKey, txt: text, lang: "en" };
        const response = await fetch("https://api.meaningcloud.com/sentiment-2.1", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams(data),
        });

        const result = await response.json();

        if (result.status.code === "0") {
            return res.json({
                sentiment: result.score_tag,
                agreement: result.agreement,
                subjectivity: result.subjectivity,
            });
        } else {
            res.status(500).json({ error: "Error in API response." });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error processing the text." });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
