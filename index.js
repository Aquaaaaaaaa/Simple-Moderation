const Discord = require('discord.js')
const client = new Discord.Client()
const colors = require('colors')
const config =   require('./config.json')
const core = require('./Utility/core.js');

client.on('ready', () => {
    console.log('Successfully Logged in as: '.cyan + client.user.tag + 'Bot has been Coded by Aqua!'.blue)
});

client.login(config.token)