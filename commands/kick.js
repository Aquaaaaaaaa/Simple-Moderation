const { MessageCollector } = require('discord.js')
const Discord = require('discord.js');
const { read } = require('fs');

module.exports = {
    name: "kick",
  execute: async (client, message, args) => {

    let NoPermissionEmbed = new Discord.MessageEmbed()
    .setTitle("Oops..")
    .setDescription('Your missing the Permission: `KICK_MEMBERS`')
    .setTimestamp()
    .setFooter('ðŸŒŠ Aquatic ')
    .setColor("#6ef6fa")
    let NoMentionEmbed = new Discord.MessageEmbed()
    .setTitle("Oops..")
    .setDescription('You Forgot to mention a User / The user is Invalid')
    .setTimestamp()
    .setFooter('ðŸŒŠ Aquatic ')
    .setColor("#6ef6fa")
    let perms = message.member.hasPermission("KICK_MEMBERS")
    if (!perms) return message.channel.send(NoPermissionEmbed)

    let user = message.mentions.members.first()
    if (!user) return message.channel.send(NoMentionEmbed)



    let reason = args.slice(1).join(" ")
    if(!reason) reason = "No Reason"

        let UserDMEmbed = new Discord.MessageEmbed()
        .setDescription("You have been **Kicked** in " + message.guild.name + ` By ${message.author} for ` + reason)
        .setFooter('Have a Nice Day!')
        .setTimestamp()
        .setFooter('ðŸŒŠ Aquatic ')
        .setColor("#6ef6fa")
        try {
            await user.send(UserDMEmbed)
        } catch (err) {
            console.log(err)
        }
        
        await user.kick()

        let UserBanTrue = new Discord.MessageEmbed()
        .setDescription(`Successfully **Kicked** ${user}`)
        message.channel.send(UserBanTrue)
  }}
