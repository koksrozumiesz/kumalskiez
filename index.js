const { Collection, Client, Discord, MessageEmbed, Message } = require('discord.js');
const client = new Client({
    disableMention: 'everyone'
});
require('discord-buttons')(client);
const path = require('path')
const fs = require('fs')
const discordbuttons = require('discord-buttons')
const { MessageButton, MessageActionRow } = require("discord-buttons")
const keepAlive = require("./server");
const config = require('./config.json');


client.on('clickButton', async (button) => {
    if (button.id == 'AddVerifiedRole') {
        button.reply.send(`Zostałeś Zweryfikowany!`, true)
        const role = button.guild.roles.cache.get(config.roleid)
        const member = button.clicker.member
        await member.roles.add(role)
    }
})

client.on('ready', () => {
    console.log('The bot is online!')
})

client.on('message', async (message) => {
    if (message.content.startsWith('.verify')) {
        const embed = new MessageEmbed()
            .setTitle('WERYFIKACJA!')
            .setColor("GREEN")
            .setDescription('KLIKNIJ W ZIELONY PRZYCISK BY SIĘ ZWERYFIKOWAĆ!')

        const add = new MessageButton()
            .setStyle("green")
            .setLabel("ZWERYFIKUJ MNIE!")
            .setID("AddVerifiedRole")

        const row = new MessageActionRow()
            .addComponent([add])


        message.channel.send({ component: row, embed: embed })
    }
})
keepAlive();
client.login(process.env.TOKEN);
