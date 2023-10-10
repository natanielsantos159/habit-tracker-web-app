import { config } from "dotenv";
import axios from "axios";
import express from 'express'
const app = express();
import bodyParser from 'body-parser';
const port = 5000;
const apiUrl = 'https://api.telegram.org/bot';

config();
const TOKEN = process.env.BOT_TOKEN;
const ENV = process.env.ENV;

console.log("Bot is running...");

app.use(bodyParser.json());
const testString = ENV === 'test' ? '/test' : '';

app.post('/', async (req, res) => {
    const chatId = req.body.message.chat.id;
    const message = req.body.message.text;
    if (message.match(/\/start/gi)) {
        await axios.post(`${apiUrl}${TOKEN}${testString}/sendMessage`, {
            chat_id: msg.chat.id,
            text: "Welcome to Habit Tracker, a simple bot designed to help you develop and maintain positive habits in your daily life.",
            reply_markup: {
                inline_keyboard: [[{ text: "Launch App 🚀", url: process.env.WEB_APP_URL }]],
            },
        });
    }
});

// Listening
app.listen(port, () => {
     console.log(`Listening on port ${port}`);
});
