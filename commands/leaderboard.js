const Discord = require('discord.js');
const mongoose = require('mongoose');
const botconfig = require('../botconfig.json');

mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Data = require('../models/data.js');

module.exports.run = async (bot, message, args) => {

    Data.find({
        lb: "all"
    }).sort([
        ['money', 'descending']
    ]).exec((err, res) => {

        if(err) console.log(err);

        var page = Math.ceil(res.length / 5);

        let embed = new Discord.MessageEmbed()
        embed.setTitle('Richest Users')
        

        let pg = parseInt(args[0]);
        if(pg != Math.floor(pg)) pg = 1;
        if(!pg) pg = 1;
        let end = pg * 5;
        let start = (pg * 5) - 5;

        if(res.length === 0) {
            return message.channel.send('There are currently no users!');
        } else if(res.length <= start) {
            return message.channel.send('Cant find that page!');
        } else if (res.length <= end) {
            embed.setFooter(`Page ${pg}/${pg}`)
            embed.setColor('GOLD: 15844367')
            for(i = start; i < res.length; i++) {
                embed.addField('\u200b', `${i + 1}. ${res[i].name} - ` + '**`' + res[i].money.toLocaleString() + '`**');
                embed.setThumbnail('https://www.bl.uk/britishlibrary/~/media/bl/global/maps/collection%20items/5%20united%20nations%20emblem.jpg')
            }
        } else {

            embed.setFooter(`Page ${pg}/${pg}`)
            embed.setColor('GOLD: 15844367')
            for(i = start; i < end; i++) {
                embed.addField('\u200b', `${i + 1}. ${res[i].name} - ` + '**`' + res[i].money.toLocaleString() + '`**');
                embed.setThumbnail('https://images-ext-2.discordapp.net/external/neFQL4B-2SSTyMmMYhlrbx0jckQQGTk5ay1rt4fo_b4/%3Fcb%3D20200630201016/https/vignette.wikia.nocookie.net/0b0t/images/1/14/HSF_army.png/revision/latest?width=400&height=284')
            }

        }

        message.channel.send(embed);

    });

}
module.exports.help = {
    name: "richest",
    aliases: ["leaderboard", "lb", "top"]
}