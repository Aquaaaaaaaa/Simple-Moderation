const Discord = require('discord.js')

module.exports = {
    name: "kick",
    execute: async (client, message, args) => {
        let nopermsembed = new Discord.MessageEmbed()
        .setTitle('Oops.. No Permission to use This Command!')
        .setDescription('Your missing the Permission: **KICK_MEMBERS**')
        .setTimestamp()
        .setFooter('Coded by Aqua!')

        let nomentionembed = new Discord.MessageEmbed()
        .setTitle('Oops... You have not Mentioned any User!')
        .setDescription('Please Mention a User!')
        .setTimestamp()
        .setFooter('Coded by Aqua!')

        let perms = message.members.hasPermission("KICK_MEMBERS")
        if(!perms) return message.channel.send(nopermsembed)

        let user = message.mentions.members.first()
        if(!user) return message.channel.send(nomentionembed)
        
        let reason = args.slice(1).join(" ")
        if(!reason) reason = "No Reason Specified!"

        let userdmembed = new Discord.MessageEmbed()
        .setDescription('You have been **KICKED** in ' + message.guild.name + `By ${message.author} for ` +reason)
        .setTimestamp()
        .setFooter('Coded by Aqua!')
        try {
            await user.send(userdmembed)
        } catch (err){
            console.log(err)
        }

        await user.kick()

        let userbanembed = new Discord.MessageEmbed()
        .setDescription(`Successfully **Kicked** ${user}`)
        message.channel.send(userbanembed)
    }
}