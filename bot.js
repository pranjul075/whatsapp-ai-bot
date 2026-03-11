const { Client } = require("whatsapp-web.js")
const qrcode = require("qrcode-terminal")
const { GoogleGenAI } = require("@google/genai")

const ai = new GoogleGenAI({
  apiKey: "AIzaSyBp6SzBCizdGGgjGlRMbqqyAOpevHc0zIE"
})

const client = new Client()

client.on("qr", qr => {
  qrcode.generate(qr, { small: true })
})

client.on("ready", () => {
  console.log("WhatsApp AI Bot Ready 🚀")
})

client.on("message", async (message) => {
  try {

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message.body
    })

    const text = result.text

    await message.reply(text)

  } catch (err) {
    console.error(err)
    message.reply("AI error occurred")
  }
})

client.initialize()