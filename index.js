const Discord = require("discord.js")
require("dotenv").config()

const client = new Discord.Client({
    intents: ["GUILDS"]
})

let bot = {
    client
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.slashcommands = new Discord.Collection()

client.loadSlashCommands = (bot, reload) => require("./handlers/slashcommands")(bot, reload)
client.loadSlashCommands(bot, false)

client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) return
    if (!interaction.inGuild()) return interaction.reply("This command can only be used in a server")

    const slashcmd = client.slashcommands.get(interaction.commandName)

    if (!slashcmd) return interaction.reply("Invalid slash command")

    if (slashcmd.perm && !interaction.member.permissions.has(slashcmd.perm))
        return interaction.reply("You don't have perems to run this")
    
    slashcmd.run(client, interaction)
})


client.on("messageCreate", (message) => {
    if (message.channel.id == "967010235829080064"){
        if (message.author.id == "864382222491451413"){
            message.delete()
            message.author.send("LLL YOU CANT SEND MESESAGES IN THAT CHANNEL SHITASS")
        }
    }
})

client.login(process.env.TOKEN)