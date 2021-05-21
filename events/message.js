const fs = require('fs');

module.exports = async (client, message) => {
    if (message.author.bot || message.channel.type === 'dm') return;

    let prefix = JSON.parse(fs.readFileSync('./config.json', 'utf8')).prefix || '.';
    client.prefix = prefix;
    if (!message.content.startsWith(prefix)) return;

    //MessageHandler
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].slice(prefix.length);
    let args = messageArray.slice(1);

    let command = client.commands.get(cmd) ? client.commands.get(cmd) : client.commands.get(client.aliases.get(cmd));
    if (command) command.execute(client, message, args);
}