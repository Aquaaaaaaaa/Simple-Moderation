const fs = require('fs').promises;
const path = require('path');
const colors = require('colors')
const clc = require('cli-color')

async function registerCommands(client, dir) {
    let files = await fs.readdir(path.join(__dirname, dir));
    // Loop through each file.
    for (let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if (stat.isDirectory()) // If file is a directory, recursive call recurDir
            registerCommands(client, path.join(dir, file));
        else {
            // Check if file is a .js file.
            if (file.endsWith(".js")) {
                try {
                    let cmdModule = require(path.join(__dirname, dir, file));
                    let { aliases } = cmdModule;
                    client.commands.set(cmdModule.name, cmdModule);
                    if (aliases && aliases.length !== 0)
                        aliases.forEach(alias => client.aliases.set(alias, cmdModule.name));
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
    }
}

async function registerEvents(client, dir) {
    let files = await fs.readdir(path.join(__dirname, dir));
    // Loop through each file.
    for (let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if (stat.isDirectory()) // If file is a directory, recursive call recurDir
            registerEvents(client, path.join(dir, file));
        else {
            // Check if file is a .js file.
            if (file.endsWith(".js")) {
                let eventName = file.substring(0, file.indexOf(".js"));
                try {
                    let eventModule = require(path.join(__dirname, dir, file));
                    client.on(eventName, eventModule.bind(null, client));
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
    }
}

module.exports = {
    registerEvents,
    registerCommands
};