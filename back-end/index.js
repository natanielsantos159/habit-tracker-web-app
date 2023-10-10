import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";

config();
const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });
console.log("Bot is running...")

bot.onText(/\/start/, async (msg) => {
    await bot.sendMessage(
        msg.chat.id,
        "Welcome to Habit Tracker, an simple bot designed to help you develop and maintain positive habits in your daily life.",
        {
            "reply_markup": {
                "inline_keyboard": [[{ text: "Launch App 🚀", web_app: { url: process.env.WEB_APP_URL } }]]
            }
        }
    );
})