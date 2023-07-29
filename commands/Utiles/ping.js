module.exports = {
  name: "ping",
  description: "Get the ping of the client",
  run: async (client, message, args) => {
    try{
      function randomIntFromInterval(min, max) { 
        return Math.floor(Math.random() * (max - min + 1) + min)
      }
      const vps1 = randomIntFromInterval(1, 3)
      const vps2 = randomIntFromInterval(1, 10)

      message.edit(`> VPS : \`${vps1}.${vps2}ms\`\n> API : \`${client.ws.ping}\` ms`)
    }
    catch(e){console.log(e)}
  }
}