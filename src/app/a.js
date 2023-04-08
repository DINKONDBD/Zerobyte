
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');
const axios = require("axios");

const bot = new Telegraf("5191675954:AAGmxRK9_USdY1-61yRYMGENRpCriyTyrTw");
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on(message('sticker'), (ctx) => ctx.reply('good sticker'));
bot.hears('help', (ctx) => ctx.reply('author- Displays author info\n'));
bot.hears('author', (ctx) => ctx.reply('author of project is ITZAXIS/DINKONDBD node.js programmer and creator'));
bot.hears('randpic', (ctx) =>
{
let rnd = Math.floor(Math.random() * 1920);
let rnd2 = Math.floor(Math.random() * 1080);
axios.get(`https://source.unsplash.com/1600x900/?beach`).then(function(response){
    const markDownData = response.data
    ctx.reply(markDownData) 
});

}
);
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));




