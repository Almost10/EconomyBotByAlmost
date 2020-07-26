  
const mongoose = require("mongoose");
const botconfig = require("../botconfig.json");

// CONNECT TO DATABASE
mongoose.connect(botconfig.mongoPass, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//MODELS
const Data = require("../models/data.js");

module.exports.run = async (bot, message, args) => {

	var cashmoney;
	
    if(!args[0]) {
        var user = message.author;
    } else {
        var user = message.mentions.users.first() || bot.users.get(args[0]);
    }

    Data.findOne({
        userID: user.id
    }, (err, data) => {
        if(err) console.log(err);
        if(!data) {
            const newData = new Data({
                name: bot.users.cache.get(user.id).username,
                userID: user.id,
                lb: "all",
                money: 0,

            })
            newData.save().catch(err => console.log(err));
			cashmoney = "ZERO";
            //return message.channel.send(`${bot.users.cache.get(user.id).username} has 0₪`);
        } else {
			cashmoney = data.money.ToString();
            //return message.channel.send(`${bot.users.cache.get(user.id).username} has ${data.money} ₪`);
        }
    
	let embed = new Discord.MessageEmbed()
        .setTitle("U.A. Unit Bot")
        .setColor('RANDOM')
        .setThumbnail(client.user.avatarURL)
        .setDescription("This is your money.")
        .addField("Your balance is: ", cashmoney + " ₪")
        .setFooter("Deal with it!")
        
	return(message.channel.send(embed));
	
	})

  }
  
  module.exports.help ={
    name: "balance", 
    aliases: ["bal", "money", "wallet"]
  }