const { Client, GatewayIntentBits } = require('discord.js')
const MusicBot = require("./Helpers/MusicBot")
const Dolar = require("./Helpers/BCV")
const { ConnectOpenAI, clearContext } = require("./OpenAI/OpenAi")

const TOKEN = process.env['token']
const guildId = process.env['guild_id']
const sagitt = process.env['MemberId']
const ermich = process.env['idMember2']

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ]
});

const musicBot = new MusicBot();

client.on('ready', async () => {

  console.log(`Logged in as ${client.user.tag}!`);
  // let guild = client.guilds.cache.get(guildId);
  // let users = await guild.members.fetch();
  // //users.forEach((member) => {
  // // console.log(member);   
  // // });

  //  let user = users.find(x => x.id == ermich)
  //  //console.log(user);
  //  //user?.send('Hellooo~');

  // let online = guild.members.cache.filter(m => (m.presence?.status === 'online' || m.presence?.status === 'idle') && !m.user.bot);
  // //console.log(online);
  // online.forEach(m => console.log((`Id:  ${m.user.id} Name: ${m.user.username} Status: ${m.presence?.status}`)))
});

client.on('interactionCreate', async interaction => {
  try {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'carol') {
      await interaction.reply('HELLOOO~!');
    }

    if (interaction.commandName === 'ruge') {
      await interaction.reply('GAOO~!');
    }

    if (interaction.commandName === 'baka') {
      interaction.reply('Vooy~ :smiley:');
      await musicBot.video(interaction, 'https://www.youtube.com/watch?v=dh5E7BpZkHM');
    }
    if (interaction.commandName === 'siu') {
      interaction.reply('SIUUU');
      await musicBot.video(interaction, 'https://www.youtube.com/watch?v=sWqWRM_0mJo');
    }
    if (interaction.commandName === 'return') {
      interaction.reply('tan taaan ta taaan tan');
      await musicBot.video(interaction, 'https://www.youtube.com/watch?v=ernOToL0dG4');
    }


    if (interaction.commandName === 'dolar') {
      const tasa = await Dolar(interaction);
      const date = new Date(tasa?.date).toLocaleDateString('en-GB');
      await interaction.reply(`la tasa del dia  ${date} eeees: ${tasa?.exchange.toFixed(2)} :smiley:`);
    }
    // if (interaction.commandName === 'debug') {
    //  Dolar(interaction);
    //await interaction.reply('revisa la consola!! ;)');
    // }
  } catch (error) {
    await interaction.reply(`OOPS Ocurrió un error :face_with_spiral_eyes: `);
  }
});

client.on("messageCreate", async function(message) {
  const prefix = '$';
  //console.log(message.content)
  const { author, content, channel } = message;
  try {
    if (author.bot)
      return;

    if (content.startsWith(`${prefix}cls`)) {
      clearContext();
      channel.send(`Contexto reiniciado utiliza el comando "$ia" para seguir hablando! uwu"`);
    }
    else if (content.startsWith(`${prefix}ia`)) {
      channel.sendTyping();
      const response = await ConnectOpenAI(content.substring(3));
      channel.send(response);
    }
    else if (content.startsWith(`${prefix}m`)) {
      musicBot.play(message);
    }
    else if (content.startsWith(`${prefix}skip`)) {
      musicBot.skip(message);
    }
    else if (content.startsWith(`${prefix}stop`)) {
      musicBot.stop(message);
    }
    //const channel = message.channel;
    // channel.send();
    // message.author.send("Hey");    
    // console.log( message.author.id); 
    // console.log(message);   

  } catch (error) {
    console.log(error);
    await channel.send(`OOPS Ocurrió un error :face_with_spiral_eyes:`)
  }
});



client.on('presenceUpdate', (oldPresence, newPresence) => {
  //let member = newPresence.member;
  //console.log(member);
  //const { user: { bot: isbot } } = member;
  //console.log(newPresence);
  // const [activity] = newPresence.activities
  //console.log(activity);
  //if (activity?.name === "RuneLite") {
  // member.send("Por favor basta con el runescape ;_;");
  // }
  // User id of the user you're tracking status. 
  // if (oldPresence?.status !== newPresence?.status) {
  //   if (newPresence?.status === "online" && !isbot) {
  //     console.log(`${member.user.username} se ha conectado`)
  //   } else if (newPresence?.status === "offline" && !isbot)
  //     console.log(`${member.user.username} se ha desconectado`)

  //   let guild = client.guilds.cache.get(guildId);
  //   let online = guild.members.cache.filter(m => (m.presence?.status === 'online' || m.presence?.status === 'idle') && !m.user.bot);
  //   console.log('Lista de usuarios conectados:')
  //   online.forEach(m => console.log((`Id:  ${m.user.id} Name: ${m.user.username} Status:       ${m.presence?.status}`)));
  // }

  // if (member?.id === sagitt || member?.id === '215971513734529025' || member?.id === ermich) {
  //   if (oldPresence?.status !== newPresence?.status) {
  //     // Your specific channel to send a message in.
  //     //let channel = member.guild.channels.cache.get('<channelId>');
  //     // You can also use member.guild.channels.resolve('<channelId>');                
  //     if (newPresence?.status === "online") {
  //       console.log('se envia')
  //       member.send("Helloooo uwu");
  //       //console.log(newPresence);
  //     }
  //     // member.send(text);
  //   }
  // }
});





client.login(TOKEN);