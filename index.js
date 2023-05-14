const fs = require('fs');
const { Bot, webhookCallback } = require("grammy");
const express = require("express");
// Import modul fs (file system) dari Node.js
require("dotenv").config();

const bot = new Bot(process.env.BOT_TOKEN);

bot.command("start", (ctx) =>
  ctx.reply(
    'hai, selamat datang di Bot kelompok kami, disini kami menampilkan bot resep masakan'
  )
);
bot.command("kelompok", (ctx) =>
  ctx.reply(
    'Amanda, Rangga, Yogi'
  )
);
bot.command("daftarmenu", (ctx) =>
  ctx.reply(
    '/nasi_goreng\n/mie_goreng\n/ayam_Balado\n/pisang_Goreng\n/ayam_Teriyaki'
  )
);
bot.command("mie_goreng", (ctx) => {
  const filePath = 'mieGoreng.txt';
  fs.readFile(filePath, 'utf-8', (error, data) => {
    if (error) {
      console.error('Terjadi kesalahan dalam membaca file:', error);
      return;
    }

    const fileContent = data;
    ctx.reply(fileContent);
  });
});
bot.command("nasi_goreng", (ctx) => {
  const filePath = 'nasiGoreng.txt';
  fs.readFile(filePath, 'utf-8', (error, data) => {
    if (error) {
      console.error('Terjadi kesalahan dalam membaca file:', error);
      return;
    }

    const fileContent = data;
    ctx.reply(fileContent);
  });
});
bot.command("ayam_Balado", (ctx) => {
  const filePath = 'ayamBalado.txt';
  fs.readFile(filePath, 'utf-8', (error, data) => {
    if (error) {
      console.error('Terjadi kesalahan dalam membaca file:', error);
      return;
    }

    const fileContent = data;
    ctx.reply(fileContent);
  });
});
bot.command("pisang_Goreng", (ctx) => {
  const filePath = 'pisangGoreng.txt';
  fs.readFile(filePath, 'utf-8', (error, data) => {
    if (error) {
      console.error('Terjadi kesalahan dalam membaca file:', error);
      return;
    }

    const fileContent = data;
    ctx.reply(fileContent);
  });
});
bot.command("ayam_Teriyaki", (ctx) => {
  const filePath = 'ayamTeriyaki.txt';
  fs.readFile(filePath, 'utf-8', (error, data) => {
    if (error) {
      console.error('Terjadi kesalahan dalam membaca file:', error);
      return;
    }

    const fileContent = data;
    ctx.reply(fileContent);
  });
});

bot.on("message", (ctx) => {
  const { first_name, last_name, username } = ctx.from;
  const name =
    first_name +
    (last_name ? ` ${last_name}` : "") +
    (username ? ` (@${username})` : "");
  ctx.reply(
    `Hi ${name} `
  );
});

if (process.env.NODE_ENV === "production") {
  const app = express();
  app.use(express.json());
  app.use(webhookCallback(bot, "express"));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Bot listening on port ${PORT}`);
  });
} else {
  bot.start();
}

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));