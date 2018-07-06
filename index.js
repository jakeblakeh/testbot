const Discord = require('discord.js');
const Client = new Discord.Client();

const prefix = "!"



Client.on("ready", () => {
	console.log("online");
	Client.user.setPresence({ game: { name: `Test`, type: 0} });
});

// welcome message

Client.on("guildMemberAdd", member => {
   member.guild.defaultChannel.send("Welcome to: " + member.guild.name + " Hope you enjoy it here")
});

Client.on("guildMemberRemove", member => {
   member.guild.defaultChannel.send("Goodbye: " + member.user.username + " from " + member.guild.name)
});

Client.on("guildCreate", guild => {
	console.log("Some one added the test bot to a server created by: " + guild.owner.user.username)
});

Client.on("message", async (message) => {
	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	
	let command = message.content.split(" ")[0];
	command = command.slice(prefix.length);
	
	let args = message.content.split(" ").slice(1);
	
	if (command === "ping") {
		message.channel.send(`Pong! Time took: ${Date.now() - message.createdTimestamp} ms`);
	} else

	if (command === "say") {
		message.delete()
        const embed = new Discord.RichEmbed()
		.setColor(0x954D23)
		.setDescription(message.author.username + " says: " + args.join(" "));
		message.channel.send({embed})
	} else

	if (command == "help") {
		const embed = new Discord.RichEmbed()
		.setColor(0x954D23)
		.setTitle("Command List:")
		.addField("!help", "Will give the current command list")
		.addField("!ping", "WIll show the ping time for the bot")
		.addField("!say [text]", "Will make the bot say something")
		message.channel.send({embed})
	}

});




const cooldown = new Set();
module.exports.run = async (bot, msg) => {
    let args = msg.content.split(' ').slice(1).join(' ');
    msg.delete();
    if (cooldown.has(msg.author.id && msg.guild.id)) {
        return msg.reply('**[COOLDOWN]** Sending tickets has **5 Minutes** Cooldown!');
    }
    if (args.length < 1) {
        return msg.reply(`You must give me something to report first ${msg.author}`);
    }

    cooldown.add(msg.author.id && msg.guild.id);
    setTimeout(() => {
        cooldown.delete(msg.author.id && msg.guild.id);
    }, 300000);
    let guild = msg.guild;
    const cnl = bot.channels.get('421569960029192202');
    msg.reply(`Hey, ${msg.author}, we got your report! We will reply soon as possible! Here is the full ticket:`);
    const embed2 = new Discord.RichEmbed()
  .setAuthor(`Ticket from ${msg.author.tag}`, msg.author.displayAvatarURL)
  .addField('Ticket:', `**Tickets's Author:** ${msg.author.tag}\n**Server:** ${guild.name}\n**Full ticket:** ${args}`)
  .setThumbnail(msg.author.displayAvatarURL)
  .setFooter(`${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
  .setColor(16711728);
    msg.channel.send({embed: embed2});
    const embed = new Discord.RichEmbed()
  .setAuthor(`Ticket from ${msg.author.tag}`, msg.author.displayAvatarURL)
  .addField('Ticket:', `**Report's Author:** ${msg.author.tag}\n**Server:** ${guild.name}\n**Full report:** ${args}`)
  .setThumbnail(msg.author.displayAvatarURL)
  .setColor("#ffd700");
    cnl.send({embed})
  .catch(e => logger.error(e))
};

module.exports.help = {
    name: 'Ticket'
};


Client.login("NDY0OTM2NDA1NjgxMDQ1NTQ0.DiGNSA.FmqvaMlzPbXn_62YBZAQ__9betc");
