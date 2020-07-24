const Discord = require('discord.js')
const fs = require("fs");

module.exports.run = async (client, message, args) => {
    if (!args[0]) {
        let embed = new Discord.MessageEmbed()
            .setTitle("U.A. Unit Bot Commands")
            .setColor('RANDOM')
            .setThumbnail(client.user.avatarURL)
            .setDescription("These are the U.A. Unit Bot commands.")
            .addField("Economy", "adminpay, adminremove, balance, leaderboard, pay")
            .addField("Miscellaneous", "avatar, ping")
            .setFooter("If you have any commands you want to see added contact me and I will try to add them.")
        message.channel.send(embed)
    }
}
module.exports.help = {
   name: "help", 
   aliases: []
   
}