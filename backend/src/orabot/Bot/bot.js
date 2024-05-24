const {Telegraf} = require('telegraf')

const TOKEN = "7148391306:AAG0LN85Z9pKee3DgoevkzzfJEYs-2-cb9A"
const WEBSITE = "https://team16.kenscourses.com/"

const bot = new Telegraf(TOKEN)
bot.start((ctx) => ctx.reply('Welcome', {reply_markup: {keyboard: [[{text: 'Web App', web_app: {url: WEBSITE}}]]} }))
bot.launch()