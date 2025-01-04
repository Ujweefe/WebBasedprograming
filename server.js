require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const path = require('path');
const app = express();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static('.'));

// CORS middleware ekleyelim
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    next();
});

app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "Sen bir web geliştirme eğitmenisin. HTML5, CSS3 ve JavaScript konularında uzmanlaşmış bir asistansın. Yanıtların kısa, öz ve Türkçe olmalı. Kod örnekleri verirken açıklamalar ekle."
                },
                {
                    role: "user",
                    content: userMessage
                }
            ],
            max_tokens: 500,
            temperature: 0.7,
        });

        res.json({ response: completion.choices[0].message.content });

    } catch (error) {
        console.error('OpenAI Error:', error);
        res.status(500).json({ 
            error: 'Bir hata oluştu, lütfen tekrar deneyin.' 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 