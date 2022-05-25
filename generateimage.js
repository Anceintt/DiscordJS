const Canvas = require("canvas")
const Discord = require("discord.js")

const background = "https://i.imgur.com/O9AddXG.jpeg"

const dim = {
    height: 1125,
    width: 1920,
    margin: 100
}

const av = {
    size: 300,
    x: 800,
    y: 370
}

const generateImage = async (member) => {
    let username = member.user.username
    let discrim = member.user.discriminator
    let avatarURL = member.user.displayAvatarURL({format: "png", dynamic: false, size: av.size})

    const canvas = Canvas.createCanvas(dim.width, dim.height)
    const ctx = canvas.getContext("2d")

    // Draw the background
    const backimg = await Canvas.loadImage(background)
    ctx.drawImage(backimg, 0, 0)

    // Draw black tinted box
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
    ctx.fillRect(dim.margin, dim.margin, dim.width - 2 * dim.margin, dim.height - 2 * dim.margin)

    const avimg = await Canvas.loadImage(avatarURL)
    ctx.save()
    
    ctx.beginPath()
    ctx.arc(av.x + av.size/2, av.y + av.size/2, av.size/2, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()
    
    ctx.drawImage(avimg, av.x, av.y)
    ctx.restore()


    // write in text
    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    // draw in Welcome
    ctx.font = "70px Roboto"
    ctx.fillText("Welcome", dim.width/2, dim.margin + 100)

    // Draw in the username
    ctx.font = "80px Roboto"
    ctx.fillText(username + "#" + discrim, dim.width/2, dim.height - dim.margin - 100)

    // Draw in to the server
    ctx.font = "60px Roboto"
    ctx.fillText("to the server", dim.width / 2, dim.height - dim.margin - 60)

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome.png")
    return attachment

}

module.exports = generateImage