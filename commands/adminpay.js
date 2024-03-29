const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");

// CONNECT TO DATABASE
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//MODELS
const Data = require("../models/data.js");
const data = require("../models/data.js");

module.exports.run = async (bot, message, args) => {
    var allowed = false;
    
    if(message.author.id == "445706307698294786") allowed = true;
    
    if(message.author.id == "698942540933758976") allowed = true;

    if(message.author.id == "546361714405277706") allowed = true;

    if(allowed == false) return message.reply("Low ranking members cannot perform this command!");

    let user = message.mentions.members.first() || bot.users.cache.get(args[0]);
    if(!user) return message.reply("I couldn't find that person");

    data.findOne({
        userID: user.id
    }, (err, userData) => {
        if(err) console.log(err);

        if(!args[1]) return message.reply("You have to say how much you wanna pay.");

        if(args[1] != Math.floor(args[1])) return message.reply("You have to put in a number!");

        if(!userData) {                   
            const newData = new Data({
                name: bot.users.cache.get(user.id).username,
                userID: user.id,
                lb: "all",
                money: parseInt(args[1]),

            })
            newData.save().catch(err => console.log(err));
        } else {
            userData.money += parseInt(args[1]);
            userData.save().catch(err => console.log(err));;
        }

        return message.channel.send(`${message.author.username} admin payed ${args[1]} ₪ to ${bot.users.cache.get(user.id).username}`);
    })
    
}
  
  module.exports.help ={
    name: "adminpay", 
    aliases: []
}