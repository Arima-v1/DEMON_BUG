//base by 𝐷𝛯𝛭𝛩𝛮-𝐵𝑈𝐺 (Xeon Bot Inc.)
//re-upload? recode? copy code? give credit ya :)
//YouTube: @
//Instagram: unicorn_xeon13
//Telegram: https://t.me/mr_royal_forger_ETN
//GitHub: @MissAri1
//WhatsApp: +237620934302 

//contact details
global.ownernomer = "237620934302"
global.owner = ["237620934302"]
global.ownername = "♱𝛭𝑅.𝑅𝛩𝑌𝛥𝐿 𝐹𝛩𝑅𝐺𝛯𝑅"
global.ytname = "YT:𝐹𝛩𝑅𝐺𝛯𝑅"
global.socialm = "GitHub: MissAri1"
global.location = "Africa, Côte d'Ivoire, Abidjan"

global.ownernumber = '237620934302'  //creator number
global.ownername = '♱𝛭𝑅.𝑅𝛩𝑌𝛥𝐿 𝐹𝛩𝑅𝐺𝛯𝑅' //owner name
global.botname = '𒋲𝐷𝛯𝛭𝛩𝛮-𝐵𝑈𝐺𒋲' //name of the bot

//sticker details
global.packname = 'Sticker By'
global.author = '『♱𝛭𝑅.𝑅𝛩𝑌𝛥𝐿 𝐹𝛩𝑅𝐺𝛯𝑅\n\nContact: +237620934302'

//console view/theme
global.themeemoji = '❄️'
global.wm = "𝐷𝛯𝛭𝛩𝛮-𝐵𝑈𝐺 Inc."

//theme link
global.link = 'https://whatsapp.com/channel/0029VawK5V80rGiNoxqiQf2U'

//prefix
global.prefa = ['','!','.',',','🐤','🗿'] 

global.limitawal = {
    premium: "Infinity",
    free: 20
}

//menu type 
//v1 is image menu, 
//v2 is link + image menu,
//v3 is video menu,
//v4 is call end menu
global.typemenu = 'v1'

// Global Respon
global.mess = {
    success: 'Done✓',
    admin: `\`[ # ]\` This Command Can Only Be Used By Group Admins !`,
    botAdmin: `\`[ # ]\` This Command Can Only Be Used When Bot Becomes Group Admin !`,
    OnlyOwner: `\`[ # ]\` This Command Can Only Be Used By Owner !`,
    OnlyGrup: `\`[ # ]\` This Command Can Only Be Used In Group Chat !`,
    private: `\`[ # ]\` This Command Can Only Be Used In Private Chat !`,
    wait: `\`[ # ]\` Wait Wait a minute`,
    notregist: `\`[ # ]\` You are not registered in the Bot Database. Please register first.`,
    premium: `\`[ # ]\` Premium only" Want Premium? Chat Owner`,
}


// Batas Setting
let fs = require('fs')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(`Update ${__filename}`)
delete require.cache[file]
require(file)
})
